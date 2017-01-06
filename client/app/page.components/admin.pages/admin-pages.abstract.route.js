import navbarAdmin from './navbar-admin.component/navbar-admin.component';
import entertainers from './entertainers-admin.page/entertainers-admin.page';
import customers from './customers-admin.page/customers-admin.page';
import orders from './orders-admin.page/orders-admin.page';

import template from './admin-pages.layout.html';

export default angular.module('admin', [
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
