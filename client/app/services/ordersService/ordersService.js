import angular from 'angular';
import CustomersService from './customersService.service';

export default angular
  .module('customersService', [])
  .service('CustomersService', CustomersService)
  .name;