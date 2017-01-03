import template from './login.page.html';
import StatefulAuthTokenService from './StatefulAuthTokenService';

export default angular.module('loginPage', [
  StatefulAuthTokenService
]).component('loginPage', {
  template,
  controller (LoginResource, $stateParams, $location, User, $state, StatefulAuthTokenService) {
    'ngInject';

    this.login = ( ) => LoginResource.login({}, this.credentials).$promise.then(({ data: user, token }) => {
      StatefulAuthTokenService.remember(token);

      Object.assign(user, {
        auth: user.first_name && user.last_name,
        role: user.role === 'client' ? 'customer' : user.role
      });
      return User.getUserProfile(user, user.role);
    }).then(user => {
      if ($stateParams.redirectUrl) {
        $location.search({}).replace( ).path($stateParams.redirectUrl);
      } else if (user.role === 'customer') {
        $state.go('main.order');
      } else if (user.role === 'admin') {
        $state.go('admin.entertainers');
      } else if (!user.first_name || user.last_name) {
        $state.go('main.profile.create');
      } else {
        $state.go('main.profile.view');
      }
    });
  }
}).name;

