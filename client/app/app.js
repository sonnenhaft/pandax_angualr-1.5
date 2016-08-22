import angular from 'angular';
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';
import uiRouter from 'angular-ui-router';
import 'angular-ui-router/release/stateEvents.js';    // enable All state events, (i.e. $stateChange* and friends), due to https://github.com/angular-ui/ui-router/releases/tag/1.0.0alpha0
import 'angular-simple-logger';
import 'angular-google-maps';
import 'moment';
import 'angular-moment';
import 'lodash';
import 'normalize.css';
import 'animate.css';
import angularMessages from 'angular-messages';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'angular-filter/dist/angular-filter.min.js';
import JWT from 'angular-jwt';

angular
  .module('app', [
    uiRouter,
    'ui.router.state.events',
    Common,
    Components,
    angularMaterial,
    'uiGmapgoogle-maps',
    'angularMoment',
    "angular.filter",
    angularMessages,
    JWT
  ])
  .config(($locationProvider, $urlRouterProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider, $httpProvider, jwtInterceptorProvider) => {
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

    //JWT interceptor will take care of sending the JWT in every request (More info: https://github.com/auth0/angular-jwt#jwtinterceptor)
    jwtInterceptorProvider.tokenGetter = function () {
      return this.Storage.getObject('MINX').token;
    };

    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .component('app', AppComponent);
