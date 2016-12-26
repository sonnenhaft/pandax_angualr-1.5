import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Validation from '../../../common-services/validation.service';
import User from '../../../common-services/user.service';

import template from './login.page.html';

class controller {
  constructor (Validation, User) {
    'ngInject';

    Object.assign(this, { Validation, User });
  }

  onSubmit (credentials) {
    if (this.validate(credentials)) {
      this.loginError = false;
      return this.login(credentials);
    }
    return false;
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

  login (credentials) {
    this.loginLoading = true;
    this.User.login(credentials).then(
      result => {
        if (result && result.error) {
          this.loginLoading = false;
          this.loginError = result.error;
        }
        return true;
      },
      ignoredError => this.loginLoading = false
    );
  }
}

export default angular.module('loginPage', [
  uiRouter,
  Validation,
  User
]).component('loginPage', {
  bindings: { output: '&' },
  template,
  controller
}).name;
