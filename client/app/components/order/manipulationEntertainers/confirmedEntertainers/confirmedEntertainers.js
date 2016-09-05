import angular from 'angular';
import uiRouter from 'angular-ui-router';
import confirmedEntertainersComponent from './confirmedEntertainers.component';
import OrderService from '../../../../services/orderService/orderService';

export default angular
  .module('confirmedEntertainers', [
    uiRouter,
    OrderService
  ])

  .component('confirmedEntertainers', confirmedEntertainersComponent)
  .name;
