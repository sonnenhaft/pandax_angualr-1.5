import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderConfirmComponent from './orderConfirm.component';
import timer from '../../../directives/timer/timer';
import showInTime from '../../../directives/showInTime/showInTime';

export default angular
  .module('orderConfirm', [
    uiRouter,
    timer,
    showInTime
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.orderConfirm', {
        url: '/:orderId/orderConfirm',
        parent: 'main',
        template: '<order-confirm \
                    invites="OrderService.listConfirmed">\
                  </order-confirm>',
        controller: function ($scope, OrderService) {
          $scope.OrderService = OrderService;
        },
        resolve: {
          orderId: function ($stateParams) {
            return $stateParams['orderId'] || 0;
          },
          entertainersConfirmed: function (OrderService, orderId) {
            return OrderService.fetchEntertainersConfirmed(orderId);
          }
        }
      });
  })
  .component('orderConfirm', orderConfirmComponent)
  .name;
