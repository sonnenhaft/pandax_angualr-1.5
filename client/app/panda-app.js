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
import JWT from 'angular-jwt';
import angularStripe from 'angular-stripe';
import ngInfiniteScroll from 'ng-infinite-scroll';
import ngSanitize from 'angular-sanitize';              // for material dialog to show text as html

// common
import Navbar from './page.components/main.page.component/navbar.component/navbar.component';
import Map from './page.components/order.pages/map.component/map.component';
import profileFields from './page.components/profile.pages/profile-fields.component/profile.fields.component';
import Spinner from './common/spinner.component/spinner.component';
import findLocation from './page.components/order.pages/find-location.page.component/find-location.page.component';
import orderDetails from './page.components/profile.pages/order-details.component/order-details.component';
import Logout from './common/logout.modal.component/logout.modal.component';

// pages
import Home from './page.components/home.pages/home.page.component';
import Main from './page.components/main.page.component/main.page.component';
import Profile from './page.components/profile.pages/profile.page.component';
import ProfileCreate from './page.components/profile.pages/create-profile.page.component/create-profile.page.component';
import ProfileView from './page.components/profile.pages/profile-view.page.component/profile-view.page.component';
import Order from './page.components/order.pages/order.page.component';
import Payments from './page.components/payments.page.component/payments.page.component';
import History from './page.components/history.pages/history.page.component';
import HistoryMinx from './page.components/history-minx.page.component/history-minx.page.component';
import Password from './page.components/password.page.component/password.page.component';
import Contact from './page.components/contact-us.page.component/contact-us.page.component';
import Admin from './page.components/admin.pages/admin.component';

import template from './panda-app.html';
import './panda-app.scss';
import dateOfBirthInput from './common/date-of-birth.input.component/date-of-birth.input.component';

const config = require('config');

angular.module('app', [
  uiRouter,
  'ui.router.state.events',
  'uiGmapgoogle-maps',
  'angularMoment',
  'angular.filter',
  angularMaterial,
  angularMessages,
  JWT,
  angularStripe,
  ngInfiniteScroll,
  ngSanitize,
].concat([
  Navbar,
  Map,
  profileFields,
  Spinner,
  findLocation,
  orderDetails,
  dateOfBirthInput,
  Logout
]).concat([
  Home,
  Main,
  Profile,
  ProfileCreate,
  ProfileView,
  Order,
  Payments,
  History,
  HistoryMinx,
  Password,
  Contact,
  Admin
])).config(($locationProvider, $urlRouterProvider, $mdThemingProvider,
            uiGmapGoogleMapApiProvider, $mdDateLocaleProvider, moment,
            $mdGestureProvider, jwtInterceptorProvider, $httpProvider, stripeProvider) => {
  'ngInject';

  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(false);

  // Extend the default angular 'grey' theme
  const primaryMap = $mdThemingProvider.extendPalette('grey', {
    900: 'FFFFFF'
  });
  const accentMap = $mdThemingProvider.extendPalette('red', {
    A200: 'ba192f',
  });
  const backgroundMap = $mdThemingProvider.extendPalette('grey', {
    50: '151520'
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
    key: 'AIzaSyCLBp2BxSpyfnqC_dhDKidNXDuHQTR-DYQ',
    v: '3', // defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });

  // JWT interceptor will take care of sending the JWT in every request (More info: https://github.com/auth0/angular-jwt#jwtinterceptor)
  jwtInterceptorProvider.tokenGetter = function tokenGetter (User) {
    'ngInject';

    return User.token( );
  };
  $httpProvider.interceptors.push('jwtInterceptor');


  // without this line tap on 'md-button' with 'ng-file-upload' not working in iPhone https://github.com/danialfarid/ng-file-upload/issues/1049
  $mdGestureProvider.skipClickHijack( );


  $urlRouterProvider.otherwise($injector => {
    const $state = $injector.get('$state');
    return $state.go('home');
  });


  $httpProvider.interceptors.push(($q, $injector) => {
    const responseHandler = response => {
      const defer = $q.defer( );

      if (response.status >= 400 && response.status != 403) { // for 403 status we have another handler only in userService.login()
        const Helper = $injector.get('Helper');
        let messageText = response.statusText;
        if (response.data) {
          if (response.data.detail) {
            messageText = response.data.detail;
          } else if (response.data.message) {
            messageText = response.data.message;
          }
        }
        Helper.showToast(messageText, 5000);
        if (response.status == 401) {
          const User = $injector.get('User');
          User.logout( );
        }
      } else if (response.status == 403) {
        const Helper = $injector.get('Helper');
        const User = $injector.get('User');
        Helper.showBanPopUp(response.data && response.data.detail);
        User.logout( );
      }

      defer.reject(response);

      return defer.promise;
    };

    return {
      responseError (rejection) {
        return responseHandler(rejection);
      }
    };
  });


  // Stripe integration
  stripeProvider.setPublishableKey(config.STRIPE.PUBLIC_KEY);
}).component('app', { template });
