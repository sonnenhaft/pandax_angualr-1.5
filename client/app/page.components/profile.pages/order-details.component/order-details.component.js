import angular from 'angular';
import uiRouter from 'angular-ui-router';
import OrderService from '../../../common-services/orderService.service';
import hoursToTime from '../../../common/hoursToTime.filter';

import template from './order-details.html';

export default angular
  .module('orderDetails', [
    uiRouter,
    OrderService
  ]).filter('hoursToTime', hoursToTime).component('orderDetails', {
    bindings: { order: '=' },
    template
  }).name;
