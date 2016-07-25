import angular from 'angular';
import Storage from './storage.service';

export default angular
  .module('storage', [])
  .service('Storage', Storage)
  .name;
