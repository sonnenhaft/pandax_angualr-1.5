import config from 'config';
import template from './rate-entertainers.html';

class controller {
  rating = { range: [1, 2, 3, 4, 5, 6, 7], default: 7 }

  constructor (OrderService, $state, $stateParams, $q, Request, StatefulUserData) {
    'ngInject';

    Object.assign(this, { OrderService, $state, $stateParams, $q, Request, StatefulUserData });

    this.Request.get(`${config.API_URL}/api/${StatefulUserData.getRole( )}/unratedinvites`).then(data => {
      this.notRatedEntertainers = data.data;
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
    component: 'rateEntertainers'
  });
}).component('rateEntertainers', {
  template,
  controller
}).name;

