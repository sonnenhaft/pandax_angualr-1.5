import angular from 'angular';
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';
import uiRouter from 'angular-ui-router';
import 'angular-simple-logger';
import 'angular-google-maps';
import 'moment';
import 'angular-moment';
import 'lodash';
import 'normalize.css';
import 'animate.css';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'angular-filter/dist/angular-filter.min.js';

angular
  .module('app', [
    uiRouter,
    Common,
    Components,
    angularMaterial,
    'uiGmapgoogle-maps',
    'angularMoment',
    "angular.filter"
  ])
  .config(($locationProvider, $urlRouterProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise($injector => {
      /*
      ToDo: autoLogout when user is not authorized
       */
    });

    // Extend the default angular 'grey' theme
    let primaryMap = $mdThemingProvider.extendPalette('grey', {
      '900': 'FFFFFF'
    });
    let accentMap = $mdThemingProvider.extendPalette('red', {
      'A200': 'ba192f',
    });
    let backgroundMap = $mdThemingProvider.extendPalette('grey', {
      '50': '151520'
    });

    $mdThemingProvider.definePalette('primaryMap', primaryMap);
    $mdThemingProvider.definePalette('accentMap', accentMap);
    $mdThemingProvider.definePalette('backgroundMap', backgroundMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('primaryMap')
      .accentPalette('accentMap')
      .backgroundPalette('backgroundMap');
      


    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAB5JHHZnmA2C6q_b7mc2zPaXdSeRocs1E',
      v: '3', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  })
  .component('app', AppComponent);
