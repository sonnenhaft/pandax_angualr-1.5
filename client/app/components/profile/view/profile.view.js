import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileViewComponent from './profile.view.component';
import Storage from '../../../services/storage/storage';

let profileViewModule = angular.module('profileView', [
  uiRouter,
  Storage
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
