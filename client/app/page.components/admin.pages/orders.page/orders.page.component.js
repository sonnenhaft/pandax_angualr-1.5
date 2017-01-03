import OrdersService from './ordersService.service';
import template from './orders.page.html';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

class controller {
  isOnProgress = false
  isLastPage = false
  currentPage = 0
  orderActiveIndex = -1
  typesOfService = []
  orderActive = null

  constructor (OrdersService, Resolve) {
    'ngInject';

    Object.assign(this, { OrdersService, Resolve, });
    this.ORDER_STATUSES = ORDER_STATUSES;
  }

  $onInit ( ) {
    this.fetchMoreItems( );
    this.Resolve.providers( ).then(typesOfService => this.typesOfService = typesOfService);
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;

    this.OrdersService.fetchOrders(this.currentPage + 1).then(data => {
      this.isOnProgress = false;
      this.currentPage = data.meta.pagination.current_page;
      this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
    });
  }

  checkIsLastPage (totalPages) {
    return this.currentPage == totalPages;
  }

  getOrderDetails (index) {
    this.isOnProgress = true;
    this.orderActiveIndex = index;

    this.OrdersService.getOrderDetails(this.OrdersService.list[this.orderActiveIndex].id).then(data => {
      this.isOnProgress = false;
      return this.orderActive = data;
    });
  }
}

const statusesViewCorrection = {
  canceled_by_provider: 'canceled by entertainer',
  canceled_by_customer: 'canceled by customer'
};

export default angular.module('orders', [
  OrdersService,
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('admin.orders', {
    url: '/orders',
    parent: 'admin',
    template: '<orders></orders>'
  });
}).component('orders', {
  template,
  controller
}).filter('statusCorrection', ( ) => status => statusesViewCorrection[status] || status)
  .name;
