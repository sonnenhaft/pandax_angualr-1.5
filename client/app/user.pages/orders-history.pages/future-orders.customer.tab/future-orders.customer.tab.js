import template from './future-orders.customer.tab.html';

class controller {
  futures = []
  isOnProgress = false
  isLastPage = false
  currentPage = 0
  activeOrders = []
  asapOrders = []

  constructor (OrderService) {
    'ngInject';

    this.OrderService = OrderService;
    this.fetchMoreItems( );
  }

  findActiveOrders (param, list = this.futures) {
    return _.chain(list).filter(order => order[param]).sortBy(order => order.datetime).value( );
  }

  moveActiveOrdersToHead (list = this.futures) {
    return _.chain(list).remove(['active', true]).union(this.activeOrders, this.asapOrders, list).value( );
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;
    this.OrderService.fetchFuturesOrders(this.currentPage + 1).then(({ items, meta: { pagination } }) => {
      this.isOnProgress = false;
      this.currentPage = pagination.current_page;
      this.futures = this.futures.concat(this.resortList(items));

      if (this.currentPage == pagination.total_pages) {
        this.isLastPage = true;
      }
    });
  }

  /**
   * Search and lift up 'ASAP' orders and orders with 'active' status
   * @param  {Array} list [List of the orders, futures by default]
   * @return {[Array]}      [Sorted list]
   */
  resortList (list = this.futures) {
    this.activeOrders = this.findActiveOrders('active', list);
    this.asapOrders = this.findActiveOrders('asapFlag', list);

    if (this.activeOrders.length || this.asapOrders.length) {
      list = this.moveActiveOrdersToHead(list);
    }

    return list;
  }
}

export default angular.module('futureOrdersCustomerTab', []).component('futureOrdersCustomerTab', {
  template,
  controller
}).name;
