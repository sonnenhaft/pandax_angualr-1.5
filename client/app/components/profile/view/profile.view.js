import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileViewComponent from './profile.view.component';

let profileViewModule = angular.module('profileView', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('profile.view', {
        url: '/view',
        parent: 'profile',
        component: 'profileView'
      });
  })

  .component('profileView', profileViewComponent)

  .name;

export default profileViewModule;
