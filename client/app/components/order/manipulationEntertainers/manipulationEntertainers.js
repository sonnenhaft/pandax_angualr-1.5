import angular from 'angular';
import uiRouter from 'angular-ui-router';
import manipulationEntertainersComponent from './manipulationEntertainers.component';
import OrderService from '../../../services/orderService/orderService';
import searchEntertainers from './search-entertainers.page/search-entertainers.page.component';
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
          orderDetails: function (OrderService, orderId) {
            return OrderService.fetchOrderDetails(orderId);
          },
          channelName: function (orderDetails) {
            return orderDetails.channel_name;
          },
          entertainersInvited: function (OrderService, channelName, orderId) {
            OrderService.subcribeOnEntertainerInvite(channelName);
            return OrderService.fetchEntertainersInvited(orderId);
          },
          countOfRequiredEntertainers: function (orderDetails) {
            return orderDetails.entertainers_number;
          },
          serviceTypePrice: function (orderDetails) {
            return orderDetails.serviceType.price;
          }
        },
        onExit: function(OrderService){
          OrderService.unsubcribeOnEntertainerInvite();
        }
      });
  })
  .component('manipulationEntertainers', manipulationEntertainersComponent)
  .name;
