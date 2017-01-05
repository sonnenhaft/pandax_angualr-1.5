import futureOrders from './future-orders.page.component/future-orders.page.component';
import pastOrders from './past-orders.page.component/past-orders.page.component';
import OrderService from '../../common-services/orderService.service';
import pastOrdersProvider from './past-orders-privider.page.component/past-orders-privider.page.component';

import template from './history.page.html';

class controller {
  constructor ($stateParams, StatefulUserData, $http) {
    'ngInject';

    Object.assign(this, { $stateParams, StatefulUserData, $http });
  }

  $onInit ( ) {
    this.tab = this.switchActiveTab( );
  }

  switchActiveTab ( ) {
    return { past: 1, future: 0 }[this.$stateParams.type || 0];
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
      isOnPending: (StatefulUserData, $http, $q) => {
        'ngInject';

        if (StatefulUserData.isProvider( )) {
          return $http.get('{{config_api_url}}/api/status').then(({ data: user }) => {
            StatefulUserData.extend(user);
            return user && user.status === 'pending';
          });
        } else {
          return $q.when(false);
        }
      }
    }
  });
}).component('history', {
  bindings: { isOnPending: '<' },
  template,
  controller
}).name;
