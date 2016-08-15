import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';
import User from '../../services/user/user';
import searchEntertainers from './searchEntertainers/searchEntertainers';
import Constants from '../../services/constant/constants';
import Location from '../../services/location/location';
import Helper from '../../services/helper/helper';
import Validation from '../../services/validation/validation';
import orderConfirm from './orderConfirm/orderConfirm';
import manipulationEntertainers from './manipulationEntertainers/manipulationEntertainers';
import Request from '../../services/request/request';


export default angular
  .module('order', [
    uiRouter,
    User,
    searchEntertainers,
    Constants,
    Location,
    Helper,
    Validation,
    orderConfirm,
    manipulationEntertainers,
    Request
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
