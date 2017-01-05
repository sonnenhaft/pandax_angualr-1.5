import OrderService from '../../../common-services/orderService.service';
import searchEntertainers from './search-entertainers.page/search-entertainers.page.component';
import confirmedEntertainers from './confirmed-entertainers.page.component/confirmed-entertainers.page.component';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

import template from './manipulation-entertainers.page.html';

class controller {
  showComponentOnly = ''
  itemActiveIndex = 0
  ORDER_STATUSES = ORDER_STATUSES

  constructor ($state, $mdMedia, $stateParams, OrderService) {
    'ngInject';

    Object.assign(this, { $state, $mdMedia, $stateParams, OrderService });
  }

  cancelOrder (ev) {
    let messageType = 0;

    if (this.OrderService.listConfirmed.length > 0) {
      messageType = 2;
    } else if (this.OrderService.listInvited.length > 0) {
      messageType = 1;
    }

    this.OrderService.cancelOrder(ev, this.$stateParams.orderId, messageType).then(data => {
      if (data.status == this.ORDER_STATUSES.accepted) {
        this.$state.go('main.orderConfirm', { orderId: this.$stateParams.orderId });
      } else {
        this.$state.go('main.order');
      }
    });
  }
}

export default angular.module('manipulationEntertainers', [
  OrderService,
  searchEntertainers,
  confirmedEntertainers
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.manipulationEntertainers', {
    url: '/:orderId/manipulation-entertainers',
    parent: 'main',
    template: `<manipulation-entertainers 
                    entertainers="OrderService.list" 
                    entertainers-invited="OrderService.listInvited"
                    count-of-required-entertainers="countOfRequiredEntertainers"
                    service-type-price="serviceTypePrice">
                  </manipulation-entertainers>`,
    controller ($scope, OrderService, countOfRequiredEntertainers, serviceTypePrice) {
      $scope.OrderService = OrderService;
      $scope.countOfRequiredEntertainers = countOfRequiredEntertainers;
      $scope.serviceTypePrice = serviceTypePrice;
    },
    resolve: {
      orderId ($stateParams) {
        'ngInject';

        return $stateParams.orderId || 0;
      },
      entertainers (OrderService, orderId) {
        'ngInject';

        return OrderService.fetchEntertainers(orderId);
      },
      orderDetails (OrderService, orderId) {
        'ngInject';

        return OrderService.fetchOrderDetails(orderId);
      },
      channelName (orderDetails) {
        'ngInject';

        return orderDetails.channel_name;
      },
      entertainersInvited (OrderService, channelName, orderId) {
        'ngInject';

        OrderService.subcribeOnEntertainerInvite(channelName);
        return OrderService.fetchEntertainersInvited(orderId);
      },
      countOfRequiredEntertainers (orderDetails) {
        'ngInject';

        return orderDetails.entertainers_number;
      },
      serviceTypePrice (orderDetails) {
        'ngInject';

        return orderDetails.serviceType.price;
      }
    },
    onExit (OrderService) {
      'ngInject';

      OrderService.unsubcribeOnEntertainerInvite( );
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
