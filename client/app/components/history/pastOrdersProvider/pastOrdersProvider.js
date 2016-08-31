import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pastOrdersProviderComponent from './pastOrdersProvider.component';

export default angular
  .module('pastOrdersProvider', [
    uiRouter
  ])
  .component('pastOrdersProvider', pastOrdersProviderComponent)
  .name;
