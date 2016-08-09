export default class Request {

  constructor ($http) {
    'ngInject';

    _.assign(this, {$http});

    this.headers = {
      'Content-Type': 'application/json'
    };

  }

  send (method, url, data) {
    return this
      .$http({
        method,
        url,
        headers: this.headers,
        data: JSON.stringify(data)
      })
      .then(
        result => result,
        error => error
      );
  }

}
