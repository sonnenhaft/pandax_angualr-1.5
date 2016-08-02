import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './map.component';

export default angular
  .module('map', [
    uiRouter
  ])
  .component('map', mapComponent)
  .name;
