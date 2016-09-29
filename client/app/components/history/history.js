import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyComponent from './history.component';
import futureOrders from './futureOrders/futureOrders';
import pastOrders from './pastOrders/pastOrders';
import OrderService from '../../services/orderService/orderService';
import pastOrdersProvider from './pastOrdersProvider/pastOrdersProvider';


export default angular
  .module('history', [
    uiRouter,
    futureOrders,
    pastOrders,
    OrderService,
    pastOrdersProvider
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.history', {
        url: '/orders-history',
        params: {
          type: ''
        },
        parent: 'main',
        component: 'history'
      });
  })
  .component('history', historyComponent)
  .name;
