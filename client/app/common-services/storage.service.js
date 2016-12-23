import angular from 'angular';

class Storage {
  constructor ($window) {
    'ngInject';

    Object.assign(this, { $window });
  }

  set (key, value) {
    this.$window.localStorage[key] = value;
  }

  get (key, defaultValue) {
    return this.$window.localStorage[key] || defaultValue;
  }

  remove (key) {
    delete this.$window.localStorage[key];
  }

  setObject (key, value) {
    this.$window.localStorage[key] = JSON.stringify(value);
  }

  getObject (key) {
    try {
      return JSON.parse(this.$window.localStorage[key] || '{}');
    } catch (E) {
      console.log(E);
    }
    return undefined;
  }

}

export default angular
  .module('Storage', [])
  .service('Storage', Storage)
  .name;
