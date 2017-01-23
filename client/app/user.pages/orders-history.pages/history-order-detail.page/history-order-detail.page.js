import OrderService from '../../../common-services/orderService.service';
import timer from '../../../common/timer.directive';
import showInTime from '../../../common/show-in-time.directive';
import template from './history-order-detail.page.html';

class controller {
  timeToCleanCancel = 5

  constructor ($stateParams, moment, OrderService, Helper) {
    'ngInject';

    Object.assign(this, { $stateParams, moment, OrderService, Helper });

    this.OrderService.getOrdersWithParam(this.$stateParams.id)
      .then(order => {
        this.order = order(order.invites || []).forEach(invite => {
          if (angular.isString(invite.length)) {
            invite.length = (invite.length - 0) * 60;
          }
        });
      });

    this.type = $stateParams.type;
  }

  cancelOrder (ev, invite) {
    const cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment( ) ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer(ev, invite, cost).then(( ) => this.Helper.showToast('Done'));
  }
}

const component = 'historyOrderDetailPage';
export default angular.module(component, [
  OrderService,
  timer,
  showInTime
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/orders-history/:type/:id',
    parent: 'main',
    name: component,
    component
  });
}).component(component, {
  template,
  controller
}).name;
