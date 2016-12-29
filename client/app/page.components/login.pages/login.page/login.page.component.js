import angular from 'angular';
import User from '../../../common-services/user.service';
import CredentialsInputsComponent from '../credentials-inputs.component/credentials-inputs.component';

import template from './login.page.html';

class controller {
  constructor (User) {
    'ngInject';

    Object.assign(this, { User });
  }

  login ( ) {
    return this.User.login(this.credentials);
  }
}

export default angular.module('loginPage', [
  CredentialsInputsComponent,
  User
]).component('loginPage', {
  template,
  controller
}).name;
