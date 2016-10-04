import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customersComponent from './customers.component';
import CustomersService from '../../../services/customersService/customersService';

export default angular
  .module('customers', [
    uiRouter,
    CustomersService
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('admin.customers', {
        url: '/customers',
        parent: 'admin',
        template: '<customers></customers>'
      });
  })
  .component('customers', customersComponent)
  .name;