import angular from 'angular';
import uiRouter from 'angular-ui-router';
import entertainersComponent from './entertainers.component';
import EntertainersService from '../../../services/entertainersService/entertainersService';

export default angular
  .module('entertainers', [
    uiRouter,
    EntertainersService
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('admin.entertainers', {
        url: '/entertainers',
        parent: 'admin',
        component: 'entertainers'
      });
  })
  .component('entertainers', entertainersComponent)
  .name;