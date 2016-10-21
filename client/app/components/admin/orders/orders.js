import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ordersComponent from './orders.component';
import OrdersService from '../../../services/ordersService/ordersService';
import hoursToTime from '../../../common/filters/hoursToTime.filter';
import statusCorrection from '../../../common/filters/statusCorrection.filter';

export default angular
  .module('orders', [
    uiRouter,
    OrdersService
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('admin.orders', {
        url: '/orders',
        parent: 'admin',
        template: '<orders></orders>'
      });
  })
  .filter('hoursToTime', hoursToTime)
  .filter('statusCorrection', statusCorrection)
  .component('orders', ordersComponent)
  .name;