import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileCreateComponent from './profile.create.component';

let profileCreateModule = angular.module('profileCreate', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.profile.create', {
        url: '/create',
        parent: 'profile',
        component: 'profileCreate'
      });
  })

  .component('profileCreate', profileCreateComponent)

  .name;

export default profileCreateModule;
