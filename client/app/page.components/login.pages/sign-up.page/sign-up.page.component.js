import angular from 'angular';

import User from '../../../common-services/user.service';
import CredentialsInputsComponent from '../credentials-inputs.component/credentials-inputs.component';

import template from './sign-up.page.html';

class controller {
  constructor (User, $stateParams, $location) {
    'ngInject';

    Object.assign(this, { User, $location });

    this.isCustomer = $stateParams.customer;
  }

  setIsCustomer (isCustomer) {
    this.isCustomer = isCustomer;
    this.$location.search({ customer: this.isCustomer ? true : undefined });
    this.$location.replace( );
  }

  signUp ( ) {
    const type = this.isCustomer ? 'customer' : 'provider';
    return this.User.register({ ...this.credentials, ...{ type } });
  }
}

export default angular.module('signUpPage', [
  CredentialsInputsComponent,
  User
]).component('signUpPage', {
  template,
  controller
}).name;
