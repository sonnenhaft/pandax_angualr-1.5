import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pastOrdersComponent from './pastOrders.component';
import hoursToTime from '../../../common/filters/hoursToTime.filter';

export default angular
  .module('pastOrders', [
    uiRouter
  ])
  .filter('hoursToTime', hoursToTime)
  .component('pastOrders', pastOrdersComponent)
  .name;
