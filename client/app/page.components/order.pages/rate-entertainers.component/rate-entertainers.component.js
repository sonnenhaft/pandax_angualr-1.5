import template from './rate-entertainers.html';
import OrderResource from '../order.resource';

class controller {
  rating = { range: [1, 2, 3, 4, 5, 6, 7], default: 7 }

  constructor ($state, $stateParams, $q, StatefulUserData, OrderResource) {
    'ngInject';

    Object.assign(this, { $state, $stateParams, $q, StatefulUserData, OrderResource });

    OrderResource.fetchNotRatedEntertainers($stateParams.notRatedEntertainers).$promise.then(notRatedEntertainers => {
      if (notRatedEntertainers && notRatedEntertainers.length) {
        this.notRatedEntertainers = notRatedEntertainers;
      } else {
        $state.go('main.create-order', { notRatedEntertainers });
      }
    });
  }

  rateEntertainers ( ) {
    const orderMap = this.notRatedEntertainers.reduce((map, { order_id, rating = this.rating.default, comment, provider: { id: provider_id } }) => {
      map[order_id] = map[order_id] || []; // eslint-disable-line camelcase
      map[order_id].push({ rating, comment, provider_id }); // eslint-disable-line camelcase
      return map;
    }, {});
    return this.$q.all(Object.keys(orderMap).map(order_id =>  // eslint-disable-line camelcase
      this.OrderResource.rateEntertainers({ order_id }, orderMap[order_id]).$promise // eslint-disable-line camelcase
    )).then(( ) => {
      this.$state.go('main.create-order', { reload: true });
    });
  }
}

export default angular.module('rateEntertainers', []).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.rate-entertainers', {
    url: '/rate-entertainers?from',
    parent: 'main',
    component: 'rateEntertainers',
    params: { notRatedEntertainers: null }
  });
}).component('rateEntertainers', {
  OrderResource,
  template,
  controller
}).name;

