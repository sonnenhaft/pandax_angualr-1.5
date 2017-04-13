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
import PandaHttpInterceptor from './panda-app.http-interceptor';

// common
import NavbarComponent from './user.pages/main-page-navbar.component/main-page-navbar.component';
import Map from './inputs/panda-google-map.input/panda-google-map.input';
import ProfilePagesComponent from './user.pages/profile.pages/profile.pages.component';
import SpinnerComponent from './common/spinner.component/spinner.component';
import FindLocationComponent from './inputs/panda-find-location.input/panda-find-location.input';
import OrderDetailsComponent from './user.pages/billing.page.component/order-details.component/order-details.component';
import LogoutComponent from './login.pages/logout.component/logout.component';

// pages
import MainPage from './user.pages/main-page.layout';
import HiddenEntertainerPage from './user.pages/hidden-entertainer.page/hidden-entertainer.page';
import OrderPage from './user.pages/order.pages/create-order.page.component';
import HistoryPage from './user.pages/orders-history.pages/orders-history';
import PasswordPage from './user.pages/password.page.component/password.page.component';
import PaymentsPage from './user.pages/payments.page.component/payments.page.component';
import HistoryMinxPage from './user.pages/orders-history.pages/history-order-detail.page/history-order-detail.page';
import ContactUsPage from './user.pages/contact-us.page.component/contact-us.page.component';
import AdminComponent from './admin.pages/admin-pages.abstract.route';
import LoginPagesRoutes, { LoginPageComponent as loginPageStateName } from './login.pages/login.pages.routes';

import hoursToTime from './common/hoursToTime.filter';

import template from './panda-app.html';
import './panda-app.scss';
import PandaAppStubsConfig from './panda-app.stubs';
import packageJson from '../../package.json';

angular.module('app', [
  uiRouter,
  'ui.router.state.events',
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
    ProfilePagesComponent,
    HiddenEntertainerPage,
    PandaAppStubsConfig,
    PandaHttpInterceptor,
    LoginPagesRoutes,
    AdminComponent,
    StatefulUserData,
    HistoryMinxPage,
    ContactUsPage,
    PasswordPage,
    PaymentsPage,
    HistoryPage,
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
}).config(($locationProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, stripeProvider, $httpProvider) => {
  'ngInject';

  $httpProvider.interceptors.push(PandaHttpInterceptor);

  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise($injector => $injector.get('$state').go(loginPageStateName));

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCLBp2BxSpyfnqC_dhDKidNXDuHQTR-DYQ',
    v: '3', // defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });

  // Stripe integration
  if (window.location.host.indexOf('app.minxnow.com') !== -1) {
    stripeProvider.setPublishableKey('pk_live_FyfabM0CcdsPhNrw2MNtUw7F');
  } else {
    stripeProvider.setPublishableKey('pk_test_53uGNlHfMPbElFTnPN8sXQ9N');
  }
})
  .filter('hoursToTime', hoursToTime)
  .component('app', {
    template,
    controller ($window) {
      'ngInject';

      this.PANDA_VERSION = $window.PANDA_VERSION = packageJson.version;
    }
  });
