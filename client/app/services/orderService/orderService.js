import angular from 'angular';
import OrderService from './orderService.service';
import Helper from '../helper/helper';

export default angular
  .module('orderService', [Helper])
  .service('OrderService', OrderService)
  .name;
