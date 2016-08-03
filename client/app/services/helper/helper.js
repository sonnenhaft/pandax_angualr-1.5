import angular from 'angular';
import Helper from './helper.service';

export default angular
  .module('helper', [])
  .service('Helper', Helper)
  .name;
