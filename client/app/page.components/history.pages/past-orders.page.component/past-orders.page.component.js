import template from './past-orders.page.html';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

class controller {
  history = []
  isOnProgress = false
  isLastPage = false
  currentPage = 0

  constructor (OrderService) {
    'ngInject';

    this.OrderService = OrderService;
    this.ORDER_STATUSES = ORDER_STATUSES;
    this.fetchMoreItems( );
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;

    this.OrderService.fetchHistoryOrders(this.currentPage + 1).then(data => {
      this.isOnProgress = false;
      this.currentPage = data.meta.pagination.current_page;
      this.history = this.history.concat(data.items);

      this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
    });
  }

  checkIsLastPage (totalPages) {
    return this.currentPage == totalPages;
  }
}

export default angular.module('pastOrders', []).component('pastOrders', {
  template,
  controller
}).name;
