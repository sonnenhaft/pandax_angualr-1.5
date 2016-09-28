import angular from 'angular';
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';
import uiRouter from 'angular-ui-router';
import 'angular-ui-router/release/stateEvents.js';    // enable All state events, (i.e. $stateChange* and friends), due to https://github.com/angular-ui/ui-router/releases/tag/1.0.0alpha0
import 'angular-simple-logger';
import 'moment';
import 'angular-moment';
import 'lodash';
import 'angular-google-maps';
import 'normalize.css';
import 'animate.css';
import angularMessages from 'angular-messages';
import 'angular-filter/dist/angular-filter.min.js';
import JWT from 'angular-jwt';
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
    JWT,
    angularStripe
  ])
  .config(($locationProvider, $urlRouterProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider, $mdDateLocaleProvider, moment, $mdGestureProvider, jwtInterceptorProvider, $httpProvider, stripeProvider) => {
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

    $mdDateLocaleProvider.formatDate = date => moment(date).format('MMMM DD, YYYY');

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCLBp2BxSpyfnqC_dhDKidNXDuHQTR-DYQ',
      v: '3', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });


    //JWT interceptor will take care of sending the JWT in every request (More info: https://github.com/auth0/angular-jwt#jwtinterceptor)
    jwtInterceptorProvider.tokenGetter = function () {
      /*
        ToDo: look for better solution without directly localStorage manipulation
       */
      let minx = localStorage.getItem('MINX');
      return minx ? minx.token : '';
    };
    $httpProvider.interceptors.push('jwtInterceptor');


    // without this line tap on 'md-button' with 'ng-file-upload' not working in iPhone https://github.com/danialfarid/ng-file-upload/issues/1049
    $mdGestureProvider.skipClickHijack();


    $urlRouterProvider.otherwise(function ($injector) {
      let $state = $injector.get("$state");
      return $state.go('home');
    });


    $httpProvider.interceptors.push(function ($q, $injector) {
      let responseHandler = (response) => {
        let defer = $q.defer();

        if (response.status == 401) {
          let User = $injector.get("User");
          User.logout();
        }

        defer.reject(response);

        return defer.promise;
      };

      return {
        'responseError': function (rejection) {
          return responseHandler(rejection);
        }
      };
    });


    // Stripe integration
    stripeProvider.setPublishableKey(config.STRIPE.PUBLIC_KEY);
  })
  .component('app', AppComponent);