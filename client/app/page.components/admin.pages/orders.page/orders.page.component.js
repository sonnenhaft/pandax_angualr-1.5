import angular from 'angular';
import uiRouter from 'angular-ui-router';

import OrdersService from '../../../common-services/ordersService.service';

import hoursToTime from '../../../common/hoursToTime.filter';
import statusCorrection from './statusCorrection.filter';

import template from './orders.page.html';

class controller {

  constructor(OrdersService, Constants, Resolve) {
    'ngInject';

    Object.assign(this, {
      OrdersService,
      Constants,
      Resolve,
      isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
      statuses: Constants.order.statuses,
      orderActiveIndex: -1,
      typesOfService: [],
      orderActive: null
    });
  }

  $onInit() {
    this.isOnProgress = true;

    this.OrdersService.fetchOrders()
      .then(data => {
        this.isOnProgress = false;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      });

    this.Resolve.providers()
      .then(data => this.typesOfService = data);
  }

  fetchMoreItems() {
    this.isOnProgress = true;

    this.OrdersService.fetchOrders(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      });
  };

  checkIsLastPage(totalPages) {
    return this.currentPage == totalPages;
  }

  getOrderDetails(index) {
    this.isOnProgress = true;
    this.orderActiveIndex = index;

    this.OrdersService.getOrderDetails(this.OrdersService.list[this.orderActiveIndex].id)
      .then((data) => {
        this.isOnProgress = false;
        return this.orderActive = data;
      });
  }
}

export default angular.module('orders', [
  uiRouter,
  OrdersService,
  statusCorrection
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('admin.orders', {
    url: '/orders',
    parent: 'admin',
    template: '<orders></orders>'
  });
}).filter('hoursToTime', hoursToTime).component('orders', {
  template,
  controller
}).name;
