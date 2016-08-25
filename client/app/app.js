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
import 'angular-filter/dist/angular-filter.min.js';
import angularStripe from 'angular-stripe';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

let config = require('config');

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
    angularStripe
  ])
  .config(($locationProvider, $urlRouterProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider, $mdDateLocaleProvider, moment, $mdGestureProvider, $httpProvider, stripeProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(false);

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

    $mdDateLocaleProvider.formatDate = date => moment(date).format('MMMM DD, YYYY');

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAB5JHHZnmA2C6q_b7mc2zPaXdSeRocs1E',
      v: '3', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });

    $mdGestureProvider.skipClickHijack(); // without this line tap on 'md-button' with 'ng-file-upload' not working in iPhone https://github.com/danialfarid/ng-file-upload/issues/1049

    $urlRouterProvider.otherwise(function ($injector) {
      let $state = $injector.get("$state");

      return $state.go('home');
    });

    $httpProvider.interceptors.push(function ($q, $injector) {
      return {
        'responseError': function (rejection) {
          var defer = $q.defer();

          if (rejection.status == 401) {
            var User = $injector.get("User");
            User.logout();
            return;
          }

          defer.reject(rejection);

          return defer.promise;
        }
      };
    });

    // Stripe integration
    stripeProvider.setPublishableKey(config.STRIPE.PUBLIC_KEY);
console.log('config', config.STRIPE.PUBLIC_KEY);
  })
  .component('app', AppComponent);
