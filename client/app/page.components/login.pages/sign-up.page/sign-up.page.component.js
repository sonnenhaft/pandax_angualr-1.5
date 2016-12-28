import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Validation from '../../../common-services/validation.service';
import User from '../../../common-services/user.service';
import template from './sign-up.page.html';

class controller {

  constructor (Validation, User, $stateParams, $location) {
    'ngInject';

    Object.assign(this, { Validation, User, $location });

    this.isCustomer = $stateParams.customer;
  }

  setIsCustomer (isCustomer) {
    this.isCustomer = isCustomer;
    this.$location.search({ customer: this.isCustomer ? true : undefined });
    this.$location.replace( );
  }

  onSubmit (credentials) {
    if (this.validate(credentials)) {
      credentials = Object.assign(credentials, { type: this.isCustomer ? 'customer' : 'provider' });
      this.registerError = false;
      return this.register(credentials);
    } else {
      return false;
    }
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[`${error.name}Error`] = error.text;
      });
      return false;
    } else {
      return true;
    }
  }

  register (credentials) {
    this.registerLoading = true;
    this.User.register(credentials).then(result => {
      if (result && result.error) {
        this.registerError = result.error;
      }
    }).finally(error => this.registerLoading = false);
  }
}

export default angular.module('signUpPage', [
  uiRouter,
  Validation,
  User
]).component('signUpPage', {
  template,
  controller
}).name;
