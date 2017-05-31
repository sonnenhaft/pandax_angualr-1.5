import template from './reset-password.page.html';

export default angular.module('resetPasswordPage', []).component('resetPasswordPage', {
  template,
  controller (LoginResource, $state, $stateParams) {
    'ngInject';

    Object.assign(this, { LoginResource, $state });

    this.resetPassword = ( ) => {
      const password = this.credentials.password;
      const token = $stateParams.reset;
      return LoginResource.resetPassword({ token }, { password }).$promise.then(( ) => {
        $state.go('loginPage');
      });
    };
  }
}).name;
