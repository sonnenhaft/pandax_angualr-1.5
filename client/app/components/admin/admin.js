import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminComponent from './admin.component';
import navbarAdmin from '../../common/navbar/navbarAdmin/navbarAdmin';
import entertainers from './entertainers/entertainers';
import customers from './customers/customers';

export default angular
  .module('admin', [
    uiRouter,
    navbarAdmin,
    entertainers,
    customers
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