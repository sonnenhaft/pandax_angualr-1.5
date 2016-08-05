import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';
import searchEntertainers from './searchEntertainers/searchEntertainers';
import Constants from '../../services/constant/constants';
import Location from '../../services/location/location';
import Helper from '../../services/helper/helper';
import Validation from '../../services/validation/validation';


export default angular
  .module('order', [
    uiRouter,
    searchEntertainers,
    Constants,
    Location,
    Helper,
    Validation
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
