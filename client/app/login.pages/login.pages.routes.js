import LoginPageComponent from './login.page/login.page.component';
import SignUpPageComponent from './sign-up.page/sign-up.page.component';

import RestorePageComponent from './restore.page/restore.page.component';
import ResetPasswordPageComponent from './reset-password.page/reset-password.page.component';

import LoginResource from './LoginResource';
import CredentialsInputsComponent from './credentials-inputs.component/credentials-inputs.component';

import template from './login.pages.layout.html';

export { LoginPageComponent };

const LoginPagesLayout = 'home';
export default angular.module(LoginPagesLayout, [
  LoginResource,
  LoginPageComponent,
  SignUpPageComponent,
  RestorePageComponent,
  CredentialsInputsComponent,
  ResetPasswordPageComponent
]).component(LoginPagesLayout, {
  template,
  controller ( ) {
    this.year = new Date( ).getFullYear( );
  }
}).config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  const params = '?email&password&customer&auto&redirectUrl';
  $stateProvider.state({ url: '/', name: LoginPagesLayout, abstract: true, component: LoginPagesLayout });
  const loginStatesMap = {
    [`login${params}`]: LoginPageComponent,
    [`restore${params}`]: RestorePageComponent,
    [`sign-up${params}`]: SignUpPageComponent,
    [`reset-password${params}`]: ResetPasswordPageComponent
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
