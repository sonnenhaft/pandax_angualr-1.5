import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyMinxComponent from './historyMinx.component';
import OrderService from '../../services/orderService/orderService';

export default angular
  .module('historyMinx', [
    uiRouter,
    OrderService
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.minx', {
        url: '/orders-history/:type/:id',
        parent: 'main',
        template: '<history-minx minx="minx"></history-minx>',
        controller: (minx, $scope) => {
          $scope.minx = minx;
        },
        resolve: {
          minx: (OrderService, $stateParams) => {
            return OrderService
              .getOrdersWithParam($stateParams.id, $stateParams.type)
              .provider;
          }
        }
      });
  })
  .component('historyMinx', historyMinxComponent)
  .name;
