import angular from 'angular';
import uiRouter from 'angular-ui-router';
import User from '../../common-services/user.service';
import Validation from '../../common-services/validation.service';
import template from './password.page.html';

class controller {
  constructor (User, Validation, Helper) {
    'ngInject';

    Object.assign(this, { User, Validation, Helper });
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[`${error.name}Error`] = error.text;
      });
      return false;
    }
    return true;
  }

  onChange (form) {
    if (this.validate(form)) {
      this.resetError = false;
      return this.reset(form.old_password, form.password);
    }

    return false;
  }

  reset (passwordOld, passwordNew) {
    this.resetLoading = true;
    this.User
      .changeByOld(passwordOld, passwordNew)
      .then(result => {
        this.resetLoading = false;

        if (result && result.error) {
          this.resetError = result.error;
          return false;
        }

        this.Helper.showToast('Your password was successfully changed', 4000);

        return true;
      },
        error => {
          this.resetLoading = false;
          console.log(error);
        }
      );
  }

}

export default angular.module('password', [
  uiRouter,
  User,
  Validation
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.password', {
    url: '/change-password',
    parent: 'main',
    component: 'password'
  });
}).component('password', {
  template,
  controller
}).name;
