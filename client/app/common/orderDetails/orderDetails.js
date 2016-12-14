import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderDetailsComponent from './orderDetails.component';
import OrderService from '../../services/orderService/orderService';
import hoursToTime from '../hoursToTime.filter';

export default angular
  .module('orderDetails', [
    uiRouter,
    OrderService
  ])

	.filter('hoursToTime', hoursToTime)

  .component('orderDetails', orderDetailsComponent)
  .name;
