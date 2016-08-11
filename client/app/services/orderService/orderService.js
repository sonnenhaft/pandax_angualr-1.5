import angular from 'angular';
import OrderService from './orderService.service';

export default angular
  .module('orderService', [])
  .service('OrderService', OrderService)
  .name;
