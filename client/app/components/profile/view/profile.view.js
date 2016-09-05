import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileViewComponent from './profile.view.component';

let profileViewModule = angular.module('profileView', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.profile.view', {
        url: '/view',
        parent: 'profile',
        params: {
          mode: null
        },
        component: 'profileView'
      });
  })

  .component('profileView', profileViewComponent)

  .name;

export default profileViewModule;
