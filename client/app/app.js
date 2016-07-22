import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import angularMaterial from 'angular-material';
import 'lodash';

import 'angular-material/angular-material.css';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    angularMaterial
  ])
  .config(($locationProvider, $urlRouterProvider, $mdThemingProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise(function ($injector) {
      /*
      ToDo: autoLogout when user is not authorized
       */
    });

    // Extend the default angular 'grey' theme
    let primaryMap = $mdThemingProvider.extendPalette('grey', {
      '900': 'FFFFFF'
    });
    let backgroundMap = $mdThemingProvider.extendPalette('grey', {
      '50': '9e9e9e'
    });

    $mdThemingProvider.definePalette('primaryMap', primaryMap);
    $mdThemingProvider.definePalette('backgroundMap', backgroundMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('primaryMap')
      .backgroundPalette('backgroundMap');
  })
  .run(($rootScope, $state) => {
    "ngInject";
    // Add state to root scope
    $rootScope.$state = $state;
  })
  .component('app', AppComponent);
