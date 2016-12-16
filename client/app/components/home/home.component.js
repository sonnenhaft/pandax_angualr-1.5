import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signIn from './login.page/login.page.component';
import signUp from './signup/signup';
import Restore from './restore/restore';
import Reset from './reset/reset';
import template from './home.html';

class controller {
  copyright = `Copyright © ${(new Date()).getFullYear()} MNX USA LLC`

  constructor($stateParams) {
    'ngInject';

    _.assign(this, {$stateParams});

    this.signIn = true;
    this.signUp = false;

  }

  $onInit() {
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

  switchTo(form) {
    this.signIn = this.signUp = this.restore = this.reset = false;
    this[form] = true;
  }

}


export default angular
  .module('home', [
    uiRouter,
    signIn,
    signUp,
    Restore,
    Reset
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('home', {
        url: '/?signup&user&restore&reset',
        component: 'home'
      });
  })
  .component('home', {
  template,
  controller
})
  .name;

