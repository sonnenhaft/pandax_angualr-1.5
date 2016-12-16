import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './future-orders.page.html';
import hoursToTime from '../../../common/hoursToTime.filter';

class controller {

  constructor (OrderService, Constants) {
    'ngInject';

    Object.assign(this, {
      OrderService,
      Constants,
      futures: [],
      isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
      activeOrders: [],
      asapOrders: []
    });

    OrderService.fetchFuturesOrders()
      .then(data => {
        if (this.currentPage == data.meta.pagination.total_pages) {
          this.isLastPage = true;
        }
        return this.futures = this.resortList(data.items);
      });
  }


  findActiveOrders (param, list = this.futures) {
    return _
      .chain(list)
      .filter(order => order[param])
      .sortBy(order => order.datetime)
      .value();
  }

  moveActiveOrdersToHead (list = this.futures) {
    return _
      .chain(list)
      .remove(['active', true])
      .union(this.activeOrders, this.asapOrders, list)
      .value();
  }

  fetchMoreItems () {
    this.isOnProgress = true;

    this.OrderService.fetchFuturesOrders(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.futures = this.futures.concat( this.resortList(data.items) );

        if (this.currentPage == data.meta.pagination.total_pages) {
          this.isLastPage = true;
        }
      })
  };

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

export default angular.module('futureOrders', [
  uiRouter,
]).filter('hoursToTime', hoursToTime).component('futureOrders', {
  template,
  controller
}).name;
