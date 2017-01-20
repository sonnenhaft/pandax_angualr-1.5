import OrderService from '../../common-services/orderService.service';
import timer from '../../common/timer.directive';
import showInTime from '../../common/show-in-time.directive';
import template from './history-minx.page.html';

class controller {
  timeToCleanCancel = 5

  constructor ($stateParams, moment, OrderService, Helper) {
    'ngInject';

    Object.assign(this, { $stateParams, moment, OrderService, Helper });

    this.type = $stateParams.type;
  }

  cancelOrder (ev, invite) {
    const cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment( ) ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer(ev, invite, cost).then(( ) => this.Helper.showToast('Done'));
  }
}

export default angular.module('historyMinx', [
  OrderService,
  timer,
  showInTime
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.minx', {
    url: '/orders-history/:type/:id',
    parent: 'main',
    template: '<history-minx order="order"></history-minx>',
    controller: (order, $scope) => $scope.order = order,
    resolve: {
      order: (OrderService, $stateParams) => {
        'ngInject';

        return OrderService.getOrdersWithParam($stateParams.id);
      }
    }
  });
}).component('historyMinx', {
  bindings: { order: '<' },
  template,
  controller
}).name;
