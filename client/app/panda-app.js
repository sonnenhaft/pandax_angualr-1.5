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
import PandaHttpInterceptor from './panda-app.http-interceptor';

// common
import NavbarComponent from './page.components/main.page.component/navbar.component/navbar.component';
import Map from './page.components/order.pages/panda-google-map.input/panda-google-map.input';
import ProfilePagesComponent from './page.components/profile.pages/profile.pages.component';
import SpinnerComponent from './common/spinner.component/spinner.component';
import FindLocationComponent from './page.components/order.pages/panda-find-location.input/panda-find-location.input';
import OrderDetailsComponent from './page.components/main.page.component/billing.page.component/order-details.component/order-details.component';
import LogoutComponent from './page.components/login.pages/logout.component/logout.component';

// pages
import MainPage from './page.components/main.page.component/main.page.component';
import OrderPage from './page.components/order.pages/create-order.page.component';
import HistoryPage from './page.components/orders-history.pages/orders-history';
import PasswordPage from './page.components/password.page.component/password.page.component';
import PaymentsPage from './page.components/payments.page.component/payments.page.component';
import HistoryMinxPage from './page.components/history-minx.page.component/history-minx.page.component';
import ContactUsPage from './page.components/contact-us.page.component/contact-us.page.component';
import AdminComponent from './page.components/admin.pages/admin-pages.abstract.route';
import LoginPagesRoutes, { LoginPageComponent as loginPageStateName } from './page.components/login.pages/login.pages.routes';

import hoursToTime from './common/hoursToTime.filter';

import template from './panda-app.html';
import './panda-app.scss';
import PandaAppStubsConfig from './panda-app.stubs';

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
    PandaAppStubsConfig,
    PandaHttpInterceptor,
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
  stripeProvider.setPublishableKey(config.STRIPE_PUBLIC_KEY);
})
  .filter('hoursToTime', hoursToTime)
  .component('app', { template });
