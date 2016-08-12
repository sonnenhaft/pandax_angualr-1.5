import angular from 'angular';
import uiRouter from 'angular-ui-router';
import restoreComponent from './restore.component';
import Validation from '../../../services/validation/validation';
import User from '../../../services/user/user';

export default angular
  .module('restore', [
    uiRouter,
    Validation,
    User
  ])
  .component('restore', restoreComponent)
  .name;
