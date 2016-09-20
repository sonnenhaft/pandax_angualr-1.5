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
                    entertainers="OrderService.list" \
                    entertainers-invited="OrderService.listInvited"\
                    count-of-required-entertainers="countOfRequiredEntertainers"\
                    service-type-price="serviceTypePrice">\
                  </manipulation-entertainers>',
        controller: function ($scope, OrderService, countOfRequiredEntertainers, serviceTypePrice) {
          $scope.OrderService = OrderService;
          $scope.countOfRequiredEntertainers = countOfRequiredEntertainers;
          $scope.serviceTypePrice = serviceTypePrice;
        },
        resolve: {
          orderId: function ($stateParams) {
            return $stateParams['orderId'] || 0;
          },
          entertainers: function (OrderService, orderId) {
            return OrderService.fetchEntertainers(orderId);
          },
          channelName: function (OrderService, orderId) {
            return OrderService.getChannelNameOfOrder(orderId);
          },
          entertainersInvited: function (OrderService, channelName, orderId) {
            OrderService.subcribeOnEntertainerInvite(channelName);
            return OrderService.fetchEntertainersInvited(orderId);
          },
          countOfRequiredEntertainers: function (OrderService, orderId) {
            return OrderService.fetchOrderDetails(orderId)
                    .then(data => data && data.entertainers_number);
          },
          serviceTypePrice: function (OrderService, orderId) {
            return OrderService.fetchOrderDetails(orderId)
                    .then(data => data && data.serviceType.price);
          }
        },
        onExit: function(OrderService){
          OrderService.unsubcribeOnEntertainerInvite();
        }
      });
  })
  .component('manipulationEntertainers', manipulationEntertainersComponent)
  .name;
