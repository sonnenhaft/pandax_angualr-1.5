import angular from 'angular';
import uiRouter from 'angular-ui-router';
import paymentsComponent from './payments.component';

export default angular
  .module('payments', [
    uiRouter
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.payments', {
        url: '/payments',
        parent: 'main',
        component: 'payments'
      });
  })
  .component('payments', paymentsComponent)
  .name;
