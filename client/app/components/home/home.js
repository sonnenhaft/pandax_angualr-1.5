import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import signIn from './signin/signin';
import signUp from './signup/signup';

let homeModule = angular.module('home', [
  uiRouter,
  signIn,
  signUp
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
