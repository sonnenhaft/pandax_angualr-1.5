import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminComponent from './admin.component';

export default angular
  .module('admin', [
    uiRouter
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('admin', {
        url: '/admin',
        abstract: true,
        component: 'admin'
      });
  })
  .component('admin', adminComponent)
  .name;