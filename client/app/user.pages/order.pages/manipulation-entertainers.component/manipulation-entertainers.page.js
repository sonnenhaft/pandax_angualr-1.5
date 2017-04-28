import OrderService from '../../../common-services/orderService.service';
import SearchEntertainersPage from './search-entertainers.page/search-entertainers.page.component';
import ConfirmedEntertainersPage from './confirmed-entertainers.page.component/confirmed-entertainers.page.component';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

import template from './manipulation-entertainers.page.html';

class controller {
  showComponentOnly = ''
  itemActiveIndex = 0
  ORDER_STATUSES = ORDER_STATUSES

  constructor ($state, $mdMedia, $stateParams, OrderService, $q, filterByFilter) {
    'ngInject';

    Object.assign(this, { $state, $mdMedia, $stateParams, OrderService, $q, filterByFilter });
  }

  $onInit ( ) {
    const orderId = this.$stateParams.orderId || 0;
    return this.$q.all({
      entertainersIgnored: this.OrderService.fetchEntertainers(orderId),
      invitedIgnored: this.OrderService.fetchEntertainersInvited(orderId),
      orderDetails: this.OrderService.fetchOrderDetails(orderId)
    }).then(({ orderDetails }) => {
      this.OrderService.subcribeOnEntertainerInvite(orderDetails.channel_name);
      this.orderDetails = orderDetails;
      const { listInvited } = this.OrderService;
      const accepted = this.ORDER_STATUSES.accepted;
      this.acceptedInvitations = this.filterByFilter(listInvited, ['status'], accepted).length;
    });
  }

  isActive (tag) {
    return this.showComponentOnly.length === 0 || this.showComponentOnly === tag;
  }

  refresh ( ) {
    this.OrderService.fetchEntertainers(this.$stateParams.orderId);
    this.itemActiveIndex = 0;
  }

  cancelOrder ( ) {
    const orderId = this.$stateParams.orderId;
    this.OrderService.cancelOrder(orderId).then(({ status }) => {
      if (status === this.ORDER_STATUSES.accepted) {
        this.$state.go('orderConfirm', { orderId });
      } else {
        this.$state.go('main.create-order');
      }
    });
  }

  $onDestroy ( ) {
    this.OrderService.unsubscribeOnEntertainerInvite( );
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
