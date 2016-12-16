import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Validation from '../../../common-services/validation.service';
import User from '../../../common-services/user.service';
import template from './signup.page.html';

class controller {

  constructor(Validation, User, $stateParams) {
    'ngInject';

    Object.assign(this, {Validation, User, $stateParams});

    this.isCustomer = true;
    this.isProvider = false;

  }

  $onInit() {
    if (this.$stateParams.signup && this.$stateParams.user) {
      this.isCustomer = this.isProvider = false;
      this['is' + _.capitalize(this.$stateParams.user)] = true;
    }
  }

  onSubmit(credentials) {
    if (this.validate(credentials)) {
      credentials = Object.assign(credentials, {
        type: this.isCustomer ? 'customer' : 'provider'
      });
      this.registerError = false;
      return this.register(credentials);
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

  register(credentials) {
    this.registerLoading = true;
    this.User
      .register(credentials)
      .then(
        result => {
          if (result && result.error) {
            this.registerLoading = false;
            this.registerError = result.error;
          }
        },
        error => {
          this.registerLoading = false;
        }
      );
  }

}

export default angular.module('signUp', [
  uiRouter,
  Validation,
  User
]).component('signUp', {
  bindings: {
    output: '&'
  },
  template,
  controller
}).name;
