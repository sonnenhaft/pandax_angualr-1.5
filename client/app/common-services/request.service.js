import angular from 'angular';

class Request {

  constructor ($http, $q) {
    'ngInject';

    Object.assign(this, { $http, $q });

    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  send (token, method, url, data) {
    const params = {
      method,
      url,
      headers: this.headers,
      data: JSON.stringify(data)
    };
    if (token) {
      params.headers = Object.assign(params.headers, { Authorization: `Bearer ${token}` });
    }
    if (!data) {
      _.unset(params, 'data');
    }
    if (data && data.type) {
      params.data = data;
      params.headers = {
        'Content-Type': data.type,
        Authorization: `Bearer ${token}`
      };
    }
    return this
      .$http(params)
      .then(
        result => result,
        error => {
          const defer = this.$q.defer( );
          defer.reject(error);
          return defer.promise;
        }
      );
  }
}

export default angular
  .module('Request', [])
  .service('Request', Request)
  .name;
