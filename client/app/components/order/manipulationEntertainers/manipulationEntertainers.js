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
        url: '/:orderId/manipulationEntertainers/:channelName',
        parent: 'main',
        template: '<manipulation-entertainers \
                    entertainers="OrderService.list" \
                    entertainers-invited="OrderService.listInvited">\
                  </manipulation-entertainers>',
        controller: function ($scope, OrderService) {
          $scope.OrderService = OrderService;
        },
        resolve: {
          orderId: function ($stateParams) {
            return $stateParams['orderId'] || 0;
          },
          channelName: function ($stateParams) {
            return $stateParams['channelName'] || 0;
          },
          entertainers: function (OrderService, orderId) {
            return OrderService.fetchEntertainers(orderId);
          },
          entertainersInvited: function (OrderService, channelName) {
            return OrderService.fetchEntertainersInvited(channelName);
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
