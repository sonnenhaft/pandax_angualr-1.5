import angular from 'angular';
import uiRouter from 'angular-ui-router';
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
    switch (this.$stateParams.type) { // eslint-disable-line default-case
      case 'past':
        return 1;

      case 'future':
        return 0;
    }
  }
}


export default angular.module('history', [
  uiRouter,
  futureOrders,
  pastOrders,
  OrderService,
  pastOrdersProvider
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.history', {
    url: '/orders-history',
    params: {
      type: ''
    },
    parent: 'main',
    component: 'history',
    resolve: {
      isOnPending: (User, Constants, $q) => {
        let result;
        if (User.get('role') == 'provider') {
          result = User.getActualStatus( )
            .then(status => status == Constants.admin.statuses.entertainer.pending);
        } else {
          const defer = $q.defer( );
          defer.resolve(false);
          result = defer.promise;
        }

        return result;
      }
    }
  });
}).component('history', {
  bindings: {
    isOnPending: '<'
  },
  template,
  controller
}).name;
