import angular from 'angular';
import uiRouter from 'angular-ui-router';
import searchEntertainersComponent from './searchEntertainers.component';
import OrderService from '../../../../services/orderService/orderService';

export default angular
  .module('searchEntertainers', [
    uiRouter,
    OrderService
  ])

  .component('searchEntertainers', searchEntertainersComponent)
  .name;
