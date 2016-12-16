import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Validation from '../../../common-services/validation.service';
import User from '../../../common-services/user.service';
import template from './reset-password.page.html';

class controller {
  constructor(Validation, User, $stateParams) {
    'ngInject';

    Object.assign(this, {Validation, User, $stateParams});

  }

  onSubmit(credentials) {
    if (this.validate(credentials)) {
      this.resetError = false;
      return this.reset(credentials.password, this.$stateParams.reset);
    }

    return false;
  }

  validate(field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
  }

  reset(password, token) {
    this.resetLoading = true;
    this.User
      .reset({password}, token)
      .then(
        result => {
          this.resetLoading = false;

          if (result && result.error) {
            this.resetLoading = result.error;
            this.registerError = result.error;
            return false;
          }

          return true;
        },
        error => {
          this.resetLoading = false;
        }
      )
      .then(result => {
        if (result) {
          this.output({view: 'signIn'});
        }
      });
  }

}

export default angular.module('reset', [
  uiRouter,
  Validation,
  User
]).component('reset', {
  bindings: {
    output: '&'
  },
  template,
  controller
}).name;
