import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signinComponent from './signin.component';
import Validation from '../../../services/validation/validation';
import User from '../../../services/user/user';

export default angular
  .module('signIn', [
    uiRouter,
    Validation,
    User
  ])
  .component('signIn', signinComponent)
  .name;
