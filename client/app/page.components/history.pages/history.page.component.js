import futureOrders from './future-orders.page.component/future-orders.page.component';
import pastOrders from './past-orders.page.component/past-orders.page.component';
import OrderService from '../../common-services/orderService.service';
import pastOrdersProvider from './past-orders-privider.page.component/past-orders-privider.page.component';

import template from './history.page.html';

class controller {
  constructor ($stateParams, User) {
    'ngInject';

    Object.assign(this, { $stateParams, User, role: User.get('role') });
  }

  $onInit ( ) {
    if (this.$stateParams.type) {
      this.tab = this.switchActiveTab( );
    }
  }

  switchActiveTab ( ) {
    return { past: 1, future: 0 }[this.$stateParams.type];
  }
}

export default angular.module('history', [
  futureOrders,
  pastOrders,
  OrderService,
  pastOrdersProvider
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.history', {
    url: '/orders-history',
    params: { type: '' },
    parent: 'main',
    component: 'history',
    resolve: {
      isOnPending: (User, $q) => {
        'ngInject';

        return User.get('role') === 'provider' // eslint-disable-line
          ? User.getActualStatus( ).then(status => status === 'pending')
          : $q.when(false);
      }
    }
  });
}).component('history', {
  bindings: { isOnPending: '<' },
  template,
  controller
}).name;
