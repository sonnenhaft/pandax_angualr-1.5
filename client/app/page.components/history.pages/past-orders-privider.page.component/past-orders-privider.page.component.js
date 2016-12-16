import angular from 'angular';
import uiRouter from 'angular-ui-router';
import hoursToTime from '../../../common/hoursToTime.filter';
import template from './past-orders-privider.page.html';
import './past-orders-privider.page.scss';

class controller {
  constructor(OrderService, Constants) {
    'ngInject';

    Object.assign(this, {
      OrderService,
      Constants,
      history: [],
      isOnProgress: true,
      isLastPage: false,
      currentPage: 1,
    });

    this.OrderService.fetchProviderPastOrders()
      .then(data => {
        this.isOnProgress = false;
        if (this.currentPage == data.meta.pagination.total_pages) {
          this.isLastPage = true;
        }
        return this.history = data.items
      });
  }

  fetchMoreItems() {
    this.isOnProgress = true;

    this.OrderService.fetchProviderPastOrders(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.history = this.history.concat(data.items);

        if (this.currentPage == data.meta.pagination.total_pages) {
          this.isLastPage = true;
        }
      })
  };

}

export default angular.module('pastOrdersProvider', [
  uiRouter
]).filter('hoursToTime', hoursToTime).component('pastOrdersProvider', {
  template,
  controller
}).name;
