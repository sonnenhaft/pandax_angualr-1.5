import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Validation from '../../../common-services/validation.service';
import User from '../../../common-services/user.service';
import template from './reset-password.page.html';

class controller {
  constructor (User, $stateParams, $state) {
    'ngInject';

    Object.assign(this, { User, $stateParams, $state });
  }

  resetPassword ( ) {
    this.User.reset(this.credentials.password, this.$stateParams.reset).then(result => {
      if (!result.error) {
        this.$state.go('signUpPage');
      }
      return result;
    });
  }
}

export default angular.module('resetPasswordPage', [
  uiRouter,
  User
]).component('resetPasswordPage', {
  template,
  controller
}).name;
