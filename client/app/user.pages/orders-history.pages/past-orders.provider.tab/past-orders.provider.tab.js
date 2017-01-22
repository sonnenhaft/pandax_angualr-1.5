import template from './past-orders.provider.tab.html';
import './past-orders.provider.tab.scss';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

class controller {
  history = []
  isOnProgress = true
  isLastPage = false
  currentPage = 0
  ORDER_STATUSES = ORDER_STATUSES

  constructor (OrderService) {
    'ngInject';

    this.OrderService = OrderService;
    this.fetchMoreItems( );
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;

    this.OrderService.fetchProviderPastOrders(this.currentPage + 1).then(({ meta: { pagination }, items: history }) => {
      this.isOnProgress = false;
      this.currentPage = pagination.current_page;
      this.history = this.history.concat(history); this.isLastPage = this.currentPage == pagination.total_pages;
    });
  }
}

export default angular.module('pastOrdersProviderTab', []).component('pastOrdersProviderTab', {
  template,
  controller
}).name;
