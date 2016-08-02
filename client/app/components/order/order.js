import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';
import Constants from '../../services/constant/constants';
import Location from '../../services/location/location';

export default angular
  .module('order', [
    uiRouter,
    Constants,
    Location
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.order', {
        url: '/order',
        parent: 'main',
        component: 'order'
      });
  })
  .component('order', orderComponent)
  .name;
