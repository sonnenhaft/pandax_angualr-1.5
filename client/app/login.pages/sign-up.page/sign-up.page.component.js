import template from './sign-up.page.html';

class controller {
  constructor (LoginResource, $stateParams, $location, $state) {
    'ngInject';

    Object.assign(this, { LoginResource, $location, $state, $stateParams });
  }

  $onInit ( ) {
    if (this.$stateParams.auto) {
      this.credentials = Object.assign(this.credentials || {}, {
        email: `${Date.now( )}hello-kitty@gmail.com`,
        password: Date.now( )
      });
    }

    this.isCustomer = this.$stateParams.customer;
  }

  setIsCustomer (isCustomer) {
    this.isCustomer = isCustomer;
    this.$location.search({ customer: this.isCustomer ? true : undefined });
    this.$location.replace( );
  }

  signUp ( ) {
    const userType = this.isCustomer ? 'customer' : 'provider';
    const { email, password } = this.credentials;
    return this.LoginResource.signup({ userType }, { email, password }).$promise.then(( ) => {
      this.$state.go('loginPage', { email, password, auto: true });
    });
  }
}

export default angular.module('signUpPage', []).component('signUpPage', {
  template,
  controller
}).name;
