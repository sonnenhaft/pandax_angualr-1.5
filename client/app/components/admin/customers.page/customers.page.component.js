import angular from 'angular';
import uiRouter from 'angular-ui-router';

import CustomersService from '../../../services/customersService/customersService';

import template from './customers.page.html';

class controller {
  constructor(CustomersService, Constants) {
    'ngInject';

    _.assign(this, {
      CustomersService,
      Constants,
      list: [],
      isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
      statuses: Constants.admin.statuses.customer
    });
  }

  $onInit() {
    this.isOnProgress = true;
    this.CustomersService.fetchCustomers()
      .then(data => {
        this.isOnProgress = false;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
        return this.list = data.items;
      });
  }

  fetchMoreItems() {
    this.isOnProgress = true;

    this.CustomersService.fetchCustomers(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.list = this.list.concat(data.items);
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      });
  };

  checkIsLastPage(totalPages) {
    return this.currentPage == totalPages;
  }
}

export default angular.module('customers', [
  uiRouter,
  CustomersService
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('admin.customers', {
    url: '/customers',
    parent: 'admin',
    component: 'customers'
  });
}).component('customers', {
  template,
  controller
}).name;
