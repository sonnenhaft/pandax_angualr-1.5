import angular from 'angular';
import uiRouter from 'angular-ui-router';
import searchEntertainersComponent from './searchEntertainers.component';
import OrderService from '../../../../services/orderService/orderService';
import billing from '../../../profile/billing.page.component/billing.page.component';

export default angular
  .module('searchEntertainers', [
    uiRouter,
    OrderService,
    billing
  ])

  .component('searchEntertainers', searchEntertainersComponent)
  .name;
