import angular from 'angular';
import uiRouter from 'angular-ui-router';
import futureOrdersComponent from './futureOrders.component';

export default angular
  .module('futureOrders', [
    uiRouter
  ])
  .component('futureOrders', futureOrdersComponent)
  .name;
