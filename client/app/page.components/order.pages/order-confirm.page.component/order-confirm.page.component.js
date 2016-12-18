import angular from 'angular';
import uiRouter from 'angular-ui-router';
import timer from '../../../common/timer.directive';
import showInTime from '../../../common/show-in-time.directive';

import template from './order-confirm.page.component.html';

class controller {
  constructor (Constants, moment, $state, OrderService, Helper) {
    'ngInject';

    Object.assign(this, {
      Constants,
      moment,
      $state,
      OrderService,
      Helper,
      timeToCleanCancel: Constants.order.timeToCleanCancel
    });
  }

  cancelOrder (ev, invite) {
    const cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment( ) ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer(ev, invite, cost).then(_data => {
      this.Helper.showToast('Done');
    });
  }

}

export default angular.module('orderConfirm', [
  uiRouter,
  timer,
  showInTime
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.orderConfirm', {
    url: '/:orderId/orderConfirm',
    parent: 'main',
    template: '<order-confirm  invites="OrderService.listConfirmed"></order-confirm>',
    controller ($scope, OrderService) {
      $scope.OrderService = OrderService;
    },
    resolve: {
      orderId ($stateParams) {
        return $stateParams.orderId || 0;
      },
      entertainersConfirmed (OrderService, orderId) {
        return OrderService.fetchEntertainersConfirmed(orderId);
      }
    }
  });
}).component('orderConfirm', {
  bindings: {
    invites: '='
  },
  template,
  controller
}).name;
