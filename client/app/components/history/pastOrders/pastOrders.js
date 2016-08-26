import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pastOrdersComponent from './pastOrders.component';

export default angular
  .module('pastOrders', [
    uiRouter
  ])
  .component('pastOrders', pastOrdersComponent)
  .name;
