export default class Request {

  constructor ($http, $q) {
    'ngInject';

    _.assign(this, {$http, $q});

    this.headers = {
      'Content-Type': 'application/json'
    };

  }

  send (token, method, url, data) {

    let params = {
      method,
      url,
      headers: this.headers,
      data: JSON.stringify(data)
    };

    if (token) {
      params.headers = _.assign(params.headers, {'Authorization': 'Bearer ' + token});
    }

    if (!data) {
      _.unset(params, 'data');
    }

    if (data && data.type) {
      params.data = data;
      params.headers = {
        'Content-Type': data.type,
        'Authorization': 'Bearer ' + token
      }
    }

    return this
      .$http(params)
      .then(
        result => result,
        error => {
          let defer = this.$q.defer();
          defer.reject(error);
          return defer.promise;
        }
      );
  }

}
