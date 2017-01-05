import template from './rate-entertainers.html';

class controller {
  rating = { range: [1, 2, 3, 4, 5, 6, 7], default: 7 }

  constructor (OrderService, $state, $stateParams, $q, $http, StatefulUserData) {
    'ngInject';

    Object.assign(this, { OrderService, $state, $stateParams, $q, $http, StatefulUserData });

    OrderService.fetchNotRatedEntertainers($stateParams.notRatedEntertainers)
      .then(notRatedEntertainers => {
        if (notRatedEntertainers && notRatedEntertainers.length) {
          this.notRatedEntertainers = notRatedEntertainers;
        } else {
          $state.go('main.create-order', { notRatedEntertainers });
        }
      });
  }

  rateEntertainers ( ) {
    this.$q.all(_(this.notRatedEntertainers).chain( ).groupBy('order_id')
      .map(items => this.OrderService.rateEntertainers(this.orderId, items.map(invite => ({
        rating: invite.rating || this.rating.default,
        comment: invite.comment,
        provider_id: invite.provider.id
      }))))
      .value( ))
      .then(( ) => {
        this.$state.go(this.$stateParams.from, {}, { reload: true });
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
  template,
  controller
}).name;

