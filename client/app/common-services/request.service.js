import angular from 'angular';

class Request {
  constructor ($http, $q) {
    'ngInject';

    Object.assign(this, { $http, $q });
  }

  send (token, method, url, data) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

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
