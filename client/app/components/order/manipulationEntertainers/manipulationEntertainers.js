import angular from 'angular';
import uiRouter from 'angular-ui-router';
import manipulationEntertainersComponent from './manipulationEntertainers.component';
import OrderService from '../../../services/orderService/orderService';
import searchEntertainers from './searchEntertainers/searchEntertainers';
import confirmedEntertainers from './confirmedEntertainers/confirmedEntertainers';

export default angular
  .module('manipulationEntertainers', [
    uiRouter,
    OrderService,
    searchEntertainers,
    confirmedEntertainers
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.manipulationEntertainers', {
        url: '/:orderId/manipulationEntertainers',
        parent: 'main',
        template: '<manipulation-entertainers \
                    entertainers-invited-count="entertainersInvitedCount" \
                    entertainers-confirmed-count="entertainersConfirmedCount" \
                    entertainers="OrderService.list" \
                    entertainers-confirmed="entertainersConfirmed">\
                  </manipulation-entertainers>',
        controller: function ($scope, entertainersConfirmed, entertainersInvitedCount, entertainersConfirmedCount, OrderService) {
          $scope.entertainersConfirmed = entertainersConfirmed;
          $scope.entertainersInvitedCount = entertainersInvitedCount;
          $scope.entertainersConfirmedCount = entertainersConfirmedCount;
          $scope.OrderService = OrderService;
        },
        resolve: {
          orderId: function ($stateParams) {
            return $stateParams['orderId'] || 0;
          },
          entertainers: function (OrderService, orderId) {
            return OrderService.fetchEntertainers(orderId);
          },
          entertainersConfirmed: function (OrderService, orderId) {
            return OrderService.fetchEntertainersConfirmed(orderId);
          },
          entertainersInvitedCount: function (OrderService) {
            return OrderService.entertainersInvitedCount;
          },
          entertainersConfirmedCount: function (OrderService) {
            return OrderService.entertainersConfirmedCount;
          }
        }
      });
  })
  .component('manipulationEntertainers', manipulationEntertainersComponent)
  .name;
