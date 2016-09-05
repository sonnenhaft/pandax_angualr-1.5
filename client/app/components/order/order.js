import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';
import User from '../../services/user/user';
import Constants from '../../services/constant/constants';
import Helper from '../../services/helper/helper';
import Validation from '../../services/validation/validation';
import OrderService from '../../services/orderService/orderService';
import orderConfirm from './orderConfirm/orderConfirm';
import manipulationEntertainers from './manipulationEntertainers/manipulationEntertainers';
import Request from '../../services/request/request';
import orderTerms from './orderTerms/orderTerms';

export default angular
  .module('order', [
    uiRouter,
    User,
    Constants,
    Helper,
    Validation,
    OrderService,
    orderConfirm,
    manipulationEntertainers,
    Request,
    orderTerms
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
