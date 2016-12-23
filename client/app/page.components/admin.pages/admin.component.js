import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarAdmin from './navbar-admin.component/navbar-admin.component';
import entertainers from './entertainers.page/entertainers.page.component';
import customers from './customers.page/customers.page.component';
import orders from './orders.page/orders.page.component';

import template from './admin.html';

export default angular.module('admin', [
  uiRouter,
  navbarAdmin,
  entertainers,
  customers,
  orders
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('admin', {
    url: '/admin',
    abstract: true,
    component: 'admin'
  });
}).component('admin', {
  template
}).name;
