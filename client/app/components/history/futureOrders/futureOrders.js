import angular from 'angular';
import uiRouter from 'angular-ui-router';
import futureOrdersComponent from './futureOrders.component';
import hoursToTime from '../../../common/filters/hoursToTime.filter';

export default angular
  .module('futureOrders', [
    uiRouter    
  ])
  .filter('hoursToTime', hoursToTime)
  .component('futureOrders', futureOrdersComponent)
  .name;
