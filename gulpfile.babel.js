import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'fs';
import sync from 'run-sequence';
import lodash from 'lodash';
import yargs from 'yargs';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpackHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';

import url from 'url';
import proxyMiddleware from 'proxy-middleware';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';

const root = 'client';

// helper method for resolving paths
const resolveToApp = (glob = '') => path.join(root, 'app', glob) // app/{glob}
;

const resolveToComponents = (glob = '') => path.join(root, 'app/components', glob) // app/components/{glob}
;

// map of all paths
const paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/panda-app.js')
  ],
  output: root,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], cb => {
  const config = require('./webpack.dist.config'); // eslint-disable-line global-require
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb( );
  });
});

gulp.task('serve', ( ) => {
  const config = require('./webpack.dev.config'); // eslint-disable-line global-require
  config.entry.app = ['webpack-hot-middleware/client?reload=true'].concat(paths.entry);

  const compiler = webpack(config);
  const proxyOptions = url.parse('https://dev3-panda-aws.isdev.info/api');
  proxyOptions.route = '/api';
  serve({
    port: process.env.PORT || 3020,
    // startPath: '/#!/login?email=admin@panda.com&password=Password1&auto',
    startPath: '/#!/login?email=provider1@panda.com&password=Password1&auto&redirectUrl=/main/profile/edit',
    // startPath: '/#!/login?email=provider1@panda.com&password=Password1&auto',
    // startPath: '/#!/login?email=customer1@panda.com&password=Password1&auto',
    open: 'local',
    server: { baseDir: root },
    https: true,
    middleware: [
      proxyMiddleware(proxyOptions),
      historyApiFallback( ),
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddelware(compiler)
    ]
  });
});

gulp.task('watch', ['serve']);

gulp.task('component', ( ) => {
  const cap = val => val.charAt(0).toUpperCase( ) + val.slice(1);
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents( ), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name,
      upCaseName: cap(name)
    }))
    .pipe(rename(path => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('clean', cb => {
  del([paths.dest]).then(paths => {
    gutil.log('[clean]', paths);
    cb( );
  });
});

gulp.task('build', ['webpack', 'copy_images'], ( ) => gulp.src('./dist/**')
    .pipe(tar('build.tar'))
    .pipe(gzip( ))
    .pipe(gulp.dest('./builds/')));

gulp.task('copy_images', ['clean'], ( ) => gulp.src('./client/assets/images/**/*.+(png|jpg|jpeg|svg)')
    .pipe(gulp.dest('./dist/assets/images/')));

gulp.task('default', ['watch']);

gulp.task('sass:landing:watch', ( ) => {
  gulp.task('sass:landing', ( ) => gulp.src('./client/landing/index.scss')
      .pipe(sourcemaps.init( ))
      .pipe(sass( ).on('error', sass.logError))
      .pipe(sourcemaps.write( ))
      .pipe(gulp.dest('./client/landing/')));

  gulp.watch('./client/landing/*.scss', ['sass:landing']);
});
