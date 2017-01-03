import config from 'config';
import angular from 'angular';
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';
import uiRouter from 'angular-ui-router';
// enable All state events, (i.e. $stateChange* and friends), due to https://github.com/angular-ui/ui-router/releases/tag/1.0.0alpha0
import 'angular-ui-router/release/stateEvents';
import 'angular-simple-logger';
import 'moment';
import 'angular-moment';
import 'lodash';
import 'angular-google-maps';
import 'normalize.css';
import 'animate.css';
import angularMessages from 'angular-messages';
import 'angular-filter/dist/angular-filter.min';
import angularStripe from 'angular-stripe';
import ngInfiniteScroll from 'ng-infinite-scroll';
import ngSanitize from 'angular-sanitize';              // for material dialog to show text as html
import StatefulUserData from './common-services/StatefulUserData';

// common
import NavbarComponent from './page.components/main.page.component/navbar.component/navbar.component';
import Map from './page.components/order.pages/map.component/map.component';
import ProfilePagesComponent from './page.components/profile.pages/profile.pages.component';
import SpinnerComponent from './common/spinner.component/spinner.component';
import FindLocationComponent from './page.components/order.pages/find-location.page.component/find-location.page.component';
import OrderDetailsComponent from './page.components/main.page.component/billing.page.component/order-details.component/order-details.component';
import LogoutComponent from './page.components/login.pages/logout.component/logout.component';

// pages
import MainPage from './page.components/main.page.component/main.page.component';
import OrderPage from './page.components/order.pages/order.page.component';
import HistoryPage from './page.components/history.pages/history.page.component';
import PasswordPage from './page.components/password.page.component/password.page.component';
import PaymentsPage from './page.components/payments.page.component/payments.page.component';
import HistoryMinxPage from './page.components/history-minx.page.component/history-minx.page.component';
import ContactUsPage from './page.components/contact-us.page.component/contact-us.page.component';
import AdminComponent from './page.components/admin.pages/admin.component';
import LoginPagesRoutes from './page.components/login.pages/login.pages.routes';

import hoursToTime from './common/hoursToTime.filter';

import template from './panda-app.html';
import './panda-app.scss';
import PandaAppStubsConfig from './panda-app.stubs';

angular.module('app', [
  uiRouter,
  'ui.router.state.events',
  'uiGmapgoogle-maps',
  'angularMoment',
  'angular.filter',
  angularMessages,
  angularMaterial,
  ngInfiniteScroll,
  angularStripe,
  ngSanitize,
  ...[
    FindLocationComponent,
    OrderDetailsComponent,
    SpinnerComponent,
    NavbarComponent,
    LogoutComponent,
    Map
  ],
  ...[
    PandaAppStubsConfig,
    StatefulUserData,
    ProfilePagesComponent,
    LoginPagesRoutes,
    HistoryMinxPage,
    PasswordPage,
    PaymentsPage,
    ContactUsPage,
    HistoryPage,
    AdminComponent,
    OrderPage,
    MainPage
  ]
]).config(($mdThemingProvider, $mdDateLocaleProvider, $mdGestureProvider, moment) => {
  'ngInject';

  $mdThemingProvider.definePalette('primaryMap', $mdThemingProvider.extendPalette('grey', { 900: 'FFFFFF' }));
  $mdThemingProvider.definePalette('accentMap', $mdThemingProvider.extendPalette('red', { A200: 'ba192f', }));
  $mdThemingProvider.definePalette('backgroundMap', $mdThemingProvider.extendPalette('grey', { 50: '151520' }));
  $mdThemingProvider.theme('default')
    .primaryPalette('primaryMap')
    .accentPalette('accentMap')
    .backgroundPalette('backgroundMap');

  $mdDateLocaleProvider.formatDate = date => moment(date).format('MMMM DD, YYYY');

  // without this line tap on 'md-button' with 'ng-file-upload' not working in iPhone https://github.com/danialfarid/ng-file-upload/issues/1049
  $mdGestureProvider.skipClickHijack( );
}).config($httpProvider => {
  'ngInject';

  $httpProvider.interceptors.push(($q, $injector) => ({
    responseError: response => {
      const Helper = $injector.get('Helper');
      const StatefulAuthTokenService = $injector.get('StatefulAuthTokenService');
      if (response.status === -1 && !response.statusText) {
        response.statusText = 'Not able to connect to remote server';
        response.data = response.data || { message: response.statusText };
        Helper.showToast(response.statusText, 5000);
      }
      if (response.detail) {
        response.statusText = response.detail;
      }
      if (response.status >= 400 && response.status != 403) { // for 403 status we have another handler only in userService.login()
        let messageText = response.statusText;
        if (response.data) {
          messageText = response.data.detail || response.data.message;
        }
        Helper.showToast(messageText, 5000);
        if (response.status == 401) {
          StatefulAuthTokenService.logout( );
        }
      } else if (response.status == 403) {
        Helper.showBanPopUp(response.data && response.data.detail);
        StatefulAuthTokenService.logout( );
      }

      return $q.reject(response);
    }
  }));
}).config(($locationProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, stripeProvider) => {
  'ngInject';

  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise($injector => $injector.get('$state').go('loginPage'));

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCLBp2BxSpyfnqC_dhDKidNXDuHQTR-DYQ',
    v: '3', // defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });

  // Stripe integration
  stripeProvider.setPublishableKey(config.STRIPE_PUBLIC_KEY);
})
  .run((StatefulAuthTokenService, StatefulUserData) => {
    'ngInject';

    StatefulAuthTokenService.restore( );
    StatefulUserData.restore( );
  })
  .filter('hoursToTime', hoursToTime)
  .component('app', { template });
