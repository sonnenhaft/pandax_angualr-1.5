import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signupComponent from './signup.component';
import Validation from '../../../services/validation/validation';
import User from '../../../services/user.service';

export default angular
  .module('signUp', [
    uiRouter,
    Validation,
    User
  ])
  .component('signUp', signupComponent)
  .name;
