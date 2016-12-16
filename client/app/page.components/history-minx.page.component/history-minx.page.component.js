import angular from 'angular';
import uiRouter from 'angular-ui-router';
import OrderService from '../../common-services/orderService.service';
import hoursToTime from '../../common/hoursToTime.filter';
import timer from '../../common/timer.directive';
import showInTime from '../../common/show-in-time.directive';
import template from './history-minx.page.html';

class controller {
  constructor($stateParams, Constants, moment, OrderService, Helper) {
    'ngInject';

    Object.assign(this, {
      $stateParams,
      Constants,
      moment,
      OrderService,
      Helper,
      timeToCleanCancel: Constants.order.timeToCleanCancel
    });

    this.type = $stateParams.type;
  }

  cancelOrder(ev, invite) {
    let cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment() ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer(ev, invite, cost).then((_data) => {
      this.Helper.showToast('Done');
    });
  }
}


export default angular.module('historyMinx', [
  uiRouter,
  OrderService,
  timer,
  showInTime
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('main.minx', {
    url: '/orders-history/:type/:id',
    parent: 'main',
    template: '<history-minx order="order"></history-minx>',
    controller: (order, $scope) => {
      $scope.order = order;
    },
    resolve: {
      order: (OrderService, $stateParams) => {
        return OrderService
          .getOrdersWithParam($stateParams.id);
      }
    }
  });
}).filter('hoursToTime', hoursToTime).component('historyMinx', {
  bindings: {
    order: '<'
  },
  template,
  controller
}).name;
