import angular from 'angular';
import uiRouter from 'angular-ui-router';
import resetComponent from './reset.component';
import Validation from '../../../services/validation/validation';
import User from '../../../services/user/user';

export default angular
  .module('reset', [
    uiRouter,
    Validation,
    User
  ])
  .component('reset', resetComponent)
  .name;
