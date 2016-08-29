import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderDetailsComponent from './orderDetails.component';
import OrderService from '../../services/orderService/orderService';

export default angular
  .module('orderDetails', [
    uiRouter,
    OrderService
  ])
  .component('orderDetails', orderDetailsComponent)
  .name;
