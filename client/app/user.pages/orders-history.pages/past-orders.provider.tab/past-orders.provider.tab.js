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

    this.OrderService.fetchProviderPastOrders(this.currentPage + 1).then(data => {
      this.isOnProgress = false;
      this.currentPage = data.meta.pagination.current_page;
      this.history = this.history.concat(data.items);

      if (this.currentPage == data.meta.pagination.total_pages) {
        this.isLastPage = true;
      }
    });
  }
}

export default angular.module('pastOrdersProviderTab', []).component('pastOrdersProviderTab', {
  template,
  controller
}).name;
