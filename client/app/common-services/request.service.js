class Request {
  constructor ($http) {
    'ngInject';

    Object.assign(this, { $http });
  }

  post (url, data) { return this._ajaxCall('POST', url, data); }

  put (url, data) { return this._ajaxCall('PUT', url, data); }

  delete (url, data) { return this._ajaxCall('PUT', url, data); }

  get (url) { return this._ajaxCall('GET', url); }

  _ajaxCall (method, url, data) {
    const headers = { 'Content-Type': 'application/json' };

    if (data) {
      if (data.type) {
        headers['Content-Type'] = data.type;
      } else {
        data = JSON.stringify(data);
      }
    }

    return this.$http({ method, url, headers, data });
  }
}

export default angular.module('Request', []).service('Request', Request).name;
