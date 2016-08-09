export default class Request {

  constructor ($http) {
    'ngInject';

    _.assign(this, {$http});

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

    return this
      .$http(params)
      .then(
        result => result,
        error => error
      );
  }

}
