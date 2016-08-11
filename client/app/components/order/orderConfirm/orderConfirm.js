import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderConfirmComponent from './orderConfirm.component';

export default angular
  .module('orderConfirm', [
    uiRouter
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.orderConfirm', {
        url: '/orderConfirm',
        parent: 'main',
        component: 'orderConfirm'
      });
  })
  .component('orderConfirm', orderConfirmComponent)
  .name;
