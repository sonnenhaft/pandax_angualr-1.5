import angular from 'angular';
import Constants from './constants.service';

export default angular
  .module('constant', [])
  .service('Constants', Constants)
  .name;
