import angular from 'angular';
import uiRouter from 'angular-ui-router';

import LoginPageComponent from './login.page.component/login.page.component';
import SignUpPageComponent from './sign-up.page.component/sign-up.page.component';

import RestorePageComponent from './restore.page.component/restore.page.component';
import ResetPasswordPageComponent from './reset-password.page.component/reset-password.page.component';
import template from './home.page.html';

class controller {
  constructor ( ) {
    'ngInject';

    this.year = new Date( ).getFullYear( );
  }
}

const HomePageComponent = 'home';
export default angular.module(HomePageComponent, [
  uiRouter,
  LoginPageComponent,
  SignUpPageComponent,
  RestorePageComponent,
  ResetPasswordPageComponent
]).config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $stateProvider.state(HomePageComponent, {
    url: '/',
    abstract: true,
    component: HomePageComponent
  }).state(LoginPageComponent, {
    url: 'login',
    parent: HomePageComponent,
    template: '<login-page></login-page>',
  }).state(SignUpPageComponent, {
    reloadOnSearch: false,
    url: 'sign-up?customer',
    parent: HomePageComponent,
    template: '<sign-up-page></sign-up-page>',
  }).state(ResetPasswordPageComponent, {
    url: 'reset-password',
    parent: HomePageComponent,
    template: '<reset-password-page></reset-password-page>',
  }).state(RestorePageComponent, {
    url: 'restore',
    parent: HomePageComponent,
    template: '<restore-page></restore-page>',
  });
  $urlRouterProvider.when('/', '/login');
}).component(HomePageComponent, {
  template,
  controller
}).name;

