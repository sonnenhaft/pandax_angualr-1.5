import timer from '../../../common/timer.directive';
import showInTime from '../../../common/show-in-time.directive';

import template from './order-confirm.page.component.html';

class controller {
  constructor (moment, $state, OrderService, Helper) {
    'ngInject';

    Object.assign(this, { moment, $state, OrderService, Helper });

    this.timeToCleanCancel = 5;
  }

  cancelOrder (ev, invite) {
    const cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment() ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer(ev, invite, cost).then(_data => {
      this.Helper.showToast('Done');
    });
  }

}

export default angular.module('orderConfirm', [
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
        'ngInject';

        return $stateParams.orderId || 0;
      },
      entertainersConfirmed (OrderService, orderId) {
        'ngInject';

        return OrderService.fetchEntertainersConfirmed(orderId);
      }
    }
  });
}).component('orderConfirm', {
  bindings: { invites: '=' },
  template,
  controller
}).name;
