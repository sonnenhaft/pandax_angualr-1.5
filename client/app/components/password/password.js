import angular from 'angular';
import uiRouter from 'angular-ui-router';
import passwordComponent from './password.component';
import User from '../../services/user/user';
import Validation from '../../services/validation/validation';

export default angular
  .module('password', [
    uiRouter,
    User,
    Validation
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.password', {
        url: '/change-password',
        parent: 'main',
        component: 'password'
      });
  })
  .component('password', passwordComponent)
  .name;
