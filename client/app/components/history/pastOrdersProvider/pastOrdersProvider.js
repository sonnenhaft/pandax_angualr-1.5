import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pastOrdersProviderComponent from './pastOrdersProvider.component';
import hoursToTime from '../../../common/filters/hoursToTime.filter';

export default angular
  .module('pastOrdersProvider', [
    uiRouter
  ])
  .filter('hoursToTime', hoursToTime)
  .component('pastOrdersProvider', pastOrdersProviderComponent)
  .name;
