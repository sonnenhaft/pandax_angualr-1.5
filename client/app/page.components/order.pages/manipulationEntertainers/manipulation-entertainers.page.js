import angular from 'angular';
import uiRouter from 'angular-ui-router';
import OrderService from '../../../common-services/orderService.service';
import searchEntertainers from './search-entertainers.page/search-entertainers.page.component';
import confirmedEntertainers from './confirmed-entertainers.page.component/confirmed-entertainers.page.component';

import template from './manipulation-entertainers.page.html';

class controller {
  constructor($state, $mdMedia, $stateParams, OrderService, Constants) {
    'ngInject';

    Object.assign(this, {
      $state,
      $mdMedia,
      $stateParams,
      OrderService,
      Constants,
      showComponentOnly: '',
      itemActiveIndex: 0
    });
  }

  cancelOrder(ev) {
    let messageType = 0;

    if (this.OrderService.listConfirmed.length > 0) {
      messageType = 2;
    } else if (this.OrderService.listInvited.length > 0) {
      messageType = 1;
    }

    this.OrderService.cancelOrder(ev, this.$stateParams.orderId, messageType)
      .then((data) => {
        if (data.status == this.Constants.order.statuses.accepted) {
          this.$state.go('main.orderConfirm', {orderId: this.$stateParams.orderId});
        } else {
          this.$state.go('main.order');
        }
      });
  }
}

export default angular.module('manipulationEntertainers', [
  uiRouter,
  OrderService,
  searchEntertainers,
  confirmedEntertainers
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('main.manipulationEntertainers', {
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
    onExit: function (OrderService) {
      OrderService.unsubcribeOnEntertainerInvite();
    }
  });
}).component('manipulationEntertainers', {
  bindings: {
    entertainers: '=',
    entertainersInvited: '=',
    countOfRequiredEntertainers: '=',
    serviceTypePrice: '<'
  },
  template,
  controller
}).name;
