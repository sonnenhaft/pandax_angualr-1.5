import template from './past-orders.customer.tab.html';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

class controller {
  history = []
  isOnProgress = false
  isLastPage = false
  currentPage = 0

  constructor (OrderService) {
    'ngInject';

    this.OrderService = OrderService;
    this.fetchMoreItems( );
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;

    this.OrderService.fetchHistoryOrders(this.currentPage + 1).then(({ meta: { pagination }, items: history }) => {
      this.currentPage = pagination.current_page;
      history.forEach(order => {
        const s = ORDER_STATUSES;
        const status = order.status;
        order.isCancelled = status === s.canceledByProvider || status === s.canceledByCustomer;
      });
      this.history = this.history.concat(history);

      this.isLastPage = this.currentPage == pagination.total_pages;
      this.isOnProgress = false;
    }).catch(e => console.log(e));
  }
}

export default angular.module('pastOrdersCustomerTab', []).component('pastOrdersCustomerTab', {
  template,
  controller
}).name;
