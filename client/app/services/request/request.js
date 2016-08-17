import angular from 'angular';
import Request from './request.service';

export default angular
  .module('request', [])
  .service('Request', Request)
  .name;
