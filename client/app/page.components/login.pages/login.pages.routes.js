import angular from 'angular';
import uiRouter from 'angular-ui-router';

import LoginPageComponent from './login.page/login.page.component';
import SignUpPageComponent from './sign-up.page/sign-up.page.component';

import RestorePageComponent from './restore.page/restore.page.component';
import ResetPasswordPageComponent from './reset-password.page/reset-password.page.component';
import template from './login.pages.layout.html';

const LoginPagesLayout = 'home';
export default angular.module(LoginPagesLayout, [
  uiRouter,
  LoginPageComponent,
  SignUpPageComponent,
  RestorePageComponent,
  ResetPasswordPageComponent
]).component(LoginPagesLayout, {
  template,
  controller ( ) {
    this.year = new Date( ).getFullYear( );
  }
}).config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $stateProvider.state({ url: '/', name: LoginPagesLayout, abstract: true, component: LoginPagesLayout });
  const loginStatesMap = {
    'login?email&password&auto': LoginPageComponent,
    'restore?password&auto': RestorePageComponent,
    'sign-up?email&password&customer&auto': SignUpPageComponent,
    'reset-password?email&auto': ResetPasswordPageComponent
  };
  Object.keys(loginStatesMap).forEach(url => $stateProvider.state({
    url,
    name: loginStatesMap[url],
    component: loginStatesMap[url],
    parent: LoginPagesLayout,
    reloadOnSearch: false
  }));

  $urlRouterProvider.when('/', '/login').when('', '/login');
}).name;
