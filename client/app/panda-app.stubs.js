export default angular.module('panda-stubs', []).config($provide => {
  'ngInject';

  $provide.decorator('$http', ['$delegate', '$q', ($http, $q) => {
    const role = 'customer';
    if (window.localStorage.stub) {
      const mocks = {
        '/api/sessions': { data: { role } },
        [`/api/${role}/profile`]: { data: { role } },
        [`/api/${role}/orders/last-not-accomplished`]: [],
        [`/api/orders/1/entertainers/search`]: [{}],
        [`/api/customer/orders/1/invites`]: {items: []},
        [`/api/orders/1`]: {serviceType: {}},
        [`/api/${role}/service-types`]: [],
        [`/api/${role}/unratedinvites`]: [
          { id: 204, order_id: 102, location: 'vulica Prytyckaha 2, Minsk, Belarus', location_notes: '111' },
          { id: 204, order_id: 102, location: 'vulica Prytyckaha 3, Minsk, Belarus', location_notes: '111', provider: { displaying_name: 'John7' } },
          { id: 204, order_id: 102, location: 'vulica Prytyckaha 4, Minsk, Belarus', location_notes: '111', finish_dt: '2016-11-02T14:24:50+00:00' }
        ]
      };

      const $httpMock = function $httpMock (config) {
        console.log(config.url)
        if (mocks[config.url]) {
          return $q.when({ data: mocks[config.url] });
        } else {
          return $http.apply($http, arguments); // eslint-disable-line prefer-rest-params
        }
      };
      return Object.assign($httpMock, $http);
    } else {
      return $http;
    }
  }]);
}).name;
