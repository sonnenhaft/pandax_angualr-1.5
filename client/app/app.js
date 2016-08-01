import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import angularMaterial from 'angular-material';
import 'angular-simple-logger';
import 'angular-google-maps';
import 'lodash';
import 'normalize.css';
import 'animate.css';
import 'angular-material/angular-material.css';

angular
  .module('app', [
    uiRouter,
    Common,
    Components,
    angularMaterial,
    'uiGmapgoogle-maps'
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
    let backgroundMap = $mdThemingProvider.extendPalette('grey', {
      '50': '151520'
    });

    $mdThemingProvider.definePalette('primaryMap', primaryMap);
    $mdThemingProvider.definePalette('backgroundMap', backgroundMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('primaryMap')
      .backgroundPalette('backgroundMap');

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAB5JHHZnmA2C6q_b7mc2zPaXdSeRocs1E',
      v: '3', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  })
  .run(($rootScope, $state) => {
    "ngInject";
    // Add state to root scope
    $rootScope.$state = $state;
  })
  .component('app', AppComponent);
