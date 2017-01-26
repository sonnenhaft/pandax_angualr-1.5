import OrderService from '../../../common-services/orderService.service';
import SearchEntertainersPage from './search-entertainers.page/search-entertainers.page.component';
import ConfirmedEntertainersPage from './confirmed-entertainers.page.component/confirmed-entertainers.page.component';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

import template from './manipulation-entertainers.page.html';

class controller {
  showComponentOnly = ''
  itemActiveIndex = 0
  ORDER_STATUSES = ORDER_STATUSES

  constructor ($state, $mdMedia, $stateParams, OrderService, $q) {
    'ngInject';

    Object.assign(this, { $state, $mdMedia, $stateParams, OrderService, $q });
  }

  $onInit ( ) {
    const orderId = this.$stateParams.orderId || 0;
    return this.$q.all({
      entertainersIgnored: this.OrderService.fetchEntertainers(orderId),
      invitedIgnored: this.OrderService.fetchEntertainersInvited(orderId),
      orderDetails: this.OrderService.fetchOrderDetails(orderId)
    }).then(({ orderDetails }) => {
      this.OrderService.subcribeOnEntertainerInvite(orderDetails.channel_name);
      console.log(orderDetails);
      this.orderDetails = orderDetails;
    });
  }

  refresh ( ) {
    this.OrderService.fetchEntertainers(this.$stateParams.orderId);
    this.itemActiveIndex = 0;
  }

  cancelOrder (ev) {
    let messageType = 0;

    if (this.OrderService.listConfirmed.length > 0) {
      messageType = 2;
    } else if (this.OrderService.listInvited.length > 0) {
      messageType = 1;
    }

    this.OrderService.cancelOrder(ev, this.$stateParams.orderId, messageType).then(({ status }) => {
      if (status === this.ORDER_STATUSES.accepted) {
        this.$state.go('orderConfirm', { orderId: this.$stateParams.orderId });
      } else {
        this.$state.go('main.create-order');
      }
    });
  }

  $onDestroy ( ) {
    this.OrderService.unsubcribeOnEntertainerInvite( );
  }
}

// TODO(vlad): rename this weird component
const component = 'manipulationEntertainers';
export default angular.module(component, [
  OrderService,
  SearchEntertainersPage,
  ConfirmedEntertainersPage
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/:orderId/manipulation-entertainers?modal',
    reloadOnSearch: false,
    name: component,
    parent: 'main',
    component
  });
}).component(component, {
  template,
  controller
}).name;
