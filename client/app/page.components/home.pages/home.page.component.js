import angular from 'angular';
import uiRouter from 'angular-ui-router';

import LoginPageComponent from './login.page.component/login.page.component';
import SignUpPageComponent from './signup.page.component/signup.page.component';

import Restore from './restore.page.component/restore.page.component';
import Reset from './reset-password.page.component/reset-password.page.component';
import template from './home.page.html';

class controller {
  copyright = `Copyright © ${(new Date( )).getFullYear( )} MNX USA LLC`

  constructor ($stateParams) {
    'ngInject';

    Object.assign(this, { $stateParams });

    this.signIn = true;
    this.signUp = false;
  }

  $onInit ( ) {
    console.log(this.$stateParams);
    if (this.$stateParams.signup && this.$stateParams.user) {
      this.signIn = false;
      this.signUp = true;
    }

    if (this.$stateParams.restore) {
      this.signIn = this.signUp = false;
      this.restore = true;
    }

    if (this.$stateParams.reset) {
      this.signIn = this.signUp = this.restore = false;
      this.reset = true;
    }
  }

  switchTo (form) {
    this.signIn = this.signUp = this.restore = this.reset = false;
    this[form] = true;
  }
}

export default angular.module('home', [
  uiRouter,
  LoginPageComponent,
  SignUpPageComponent,
  Restore,
  Reset
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('home', {
    url: '/?signup&user&restore&reset',
    component: 'home'
  });
}).component('home', {
  template,
  controller
}).name;

