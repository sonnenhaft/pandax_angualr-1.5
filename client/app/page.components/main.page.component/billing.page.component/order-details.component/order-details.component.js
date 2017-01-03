import OrderService from '../../../../common-services/orderService.service';
import template from './order-details.html';

export default angular.module('orderDetails', [
  OrderService
]).component('orderDetails', {
  bindings: { order: '=' },
  template
}).name;
