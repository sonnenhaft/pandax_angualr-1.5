class Storage {
  constructor ($window) {
    'ngInject';

    Object.assign(this, { localStorage: $window.localStorage });
  }

  set (key, value) {
    this.localStorage[key] = value;
  }

  get (key, defaultValue) {
    return this.localStorage[key] || defaultValue;
  }

  remove (key) {
    delete this.localStorage[key];
  }

  setObject (key, value) {
    this.localStorage[key] = JSON.stringify(value);
  }

  getObject (key) {
    try {
      return JSON.parse(this.localStorage[key] || '{}');
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}

export default angular.module('Storage', []).service('Storage', Storage).name;
