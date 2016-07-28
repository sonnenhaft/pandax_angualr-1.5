import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';

export default angular
  .module('order', [
    uiRouter
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.order', {
        url: '/order',
        parent: 'main',
        component: 'order'
      });
  })
  .component('order', orderComponent)
  .name;
