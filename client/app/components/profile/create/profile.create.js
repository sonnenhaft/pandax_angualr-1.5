import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileCreateComponent from './profile.create.component';
import Storage from '../../../services/storage/storage';
import Validation from '../../../services/validation/validation';
import Constants from '../../../services/constant/constants';
import ngFileUpload from 'ng-file-upload';

let profileCreateModule = angular.module('profileCreate', [
  uiRouter,
  Storage,
  Validation,
  Constants,
  ngFileUpload
])

  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('profile.create', {
        url: '/create',
        parent: 'profile',
        component: 'profileCreate'
      });
  })

  .component('profileCreate', profileCreateComponent)

  .name;

export default profileCreateModule;
