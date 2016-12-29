var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

module.exports = Object.assign(config, {
  devtool: 'eval',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'client')
  },
  plugins: config.plugins.concat([new webpack.HotModuleReplacementPlugin()]),
  resolve: { alias: { config: path.join(__dirname, 'config/development') } }
})
