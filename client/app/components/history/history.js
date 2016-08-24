import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyComponent from './history.component';
import futureOrders from './futureOrders/futureOrders';
import pastOrders from './pastOrders/pastOrders';

export default angular
  .module('history', [
    uiRouter,
    futureOrders,
    pastOrders
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.history', {
        url: '/orders-history',
        parent: 'main',
        component: 'history'
      });
  })
  .component('history', historyComponent)
  .name;
