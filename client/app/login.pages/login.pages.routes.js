import LoginPageComponent from './login.page/login.page.component';
import SignUpPageComponent from './sign-up.page/sign-up.page.component';

import RestorePageComponent from './restore.page/restore.page.component';
import ResetPasswordPageComponent from './reset-password.page/reset-password.page.component';

import LoginResource from './LoginResource';
import CredentialsInputsComponent from './credentials-inputs.component/credentials-inputs.component';
import CustomersAdminPage from '../admin.pages/customers-admin.page/customers-admin.page';
import ContactUsPage from '../user.pages/contact-us.page.component/contact-us.page.component';

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
  template
}).config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  const params = '?email&password&customer&auto&redirectUrl';
  $stateProvider.state({
    url: '/',
    name: LoginPagesLayout,
    abstract: true,
    component: LoginPagesLayout,
    resolve: {
      allowPagesOrRedirect ($state, StatefulUserData) {
        'ngInject';

        if (StatefulUserData.isAdmin( )) {
          $state.go(CustomersAdminPage);
        } else if (StatefulUserData.isCustomer( ) || StatefulUserData.isProvider( )) {
          $state.go(ContactUsPage);
        }
      }
    }
  });
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
    reloadOnSearch: false,
  }));

  $urlRouterProvider.when('/', '/login').when('', '/login');
}).name;
