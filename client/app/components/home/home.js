import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import Validation from '../../services/validation/validation';
import Storage from '../../services/storage/storage';

let homeModule = angular.module('home', [
  uiRouter,
  Validation,
  Storage
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
