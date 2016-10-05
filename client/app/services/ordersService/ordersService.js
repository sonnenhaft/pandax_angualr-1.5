import angular from 'angular';
import OrdersService from './ordersService.service';

export default angular
  .module('ordersService', [])
  .service('OrdersService', OrdersService)
  .name;