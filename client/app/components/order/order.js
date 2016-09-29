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
        component: 'order',
        onEnter: function($transition$, $state, OrderService, Constants) {
          OrderService.fetchLastNotAccomplishedOrder()
            .then(data => {
console.log('data:', data);
              if (data.status == Constants.order.statuses.new) {
                if (data.customer.is_newcomer) {
                  $state.go('main.accept', {order: data});
                } else {
                  $state.go('main.manipulationEntertainers', {orderId: data.id});
                }
              } else if (data.status == Constants.order.statuses.paid) {
                $state.go('main.manipulationEntertainers', {orderId: data.id});
              }
            });
        }
      });
  })
  .component('order', orderComponent)
  .name;
