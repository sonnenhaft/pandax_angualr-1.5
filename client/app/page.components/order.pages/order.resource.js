import ngResource from 'angular-resource';

export default angular.module('OrderResource', [
  ngResource
]).factory('OrderResource', ($resource, $q) => {
  'ngInject';

  const OrderResource = $resource('', {}, {
    rateEntertainers: { url: '{{config_api_url}}/api/orders/:order_id/ratings', method: 'POST' },
    // [{
    //   "rating": 10,
    //   "comment": "Awesome",
    //   "provider_id": 2
    // }]
    fetchNotRatedEntertainers: { url: '{{config_api_url}}/api/{{current_user_role}}/unratedinvites', method: 'GET', isArray: true }
  }, { cancellable: true });

  const fetchNotRatedEntertainers = OrderResource.fetchNotRatedEntertainers.bind(OrderResource);
  OrderResource.fetchNotRatedEntertainers = function fetch (ignored, data) {
    if (data) {
      return { $promise: this.$q.when(data) };
    } else {
      return fetchNotRatedEntertainers( );
    }
  };

  return OrderResource;
}).name;
