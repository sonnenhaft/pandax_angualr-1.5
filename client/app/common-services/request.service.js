import angular from 'angular';

class Request {
  constructor ($http, $q, Storage) {
    'ngInject';

    Object.assign(this, { $http, $q, Storage });
  }

  send (token, method, url, data) {
    const headers = { 'Content-Type': 'application/json' };
    token = token || this.Storage.getObject('MINX').token;
    headers.Authorization = `Bearer ${token}`;

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
