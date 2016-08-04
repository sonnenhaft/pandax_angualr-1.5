import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import Validation from '../../services/validation/validation';
import User from '../../services/user/user';

let homeModule = angular.module('home', [
  uiRouter,
  Validation,
  User
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('home', {
      url: '/?signup&user',
      component: 'home'
    });
})

.component('home', homeComponent)

.name;

export default homeModule;
