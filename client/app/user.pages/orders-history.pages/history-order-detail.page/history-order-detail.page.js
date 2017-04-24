import OrderService from '../../../common-services/orderService.service';
import timer from '../../../common/timer.directive';
import showInTime from '../../../common/show-in-time.directive';
import template from './history-order-detail.page.html';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';

class controller {
  constructor ($stateParams, moment, OrderService, Helper) {
    'ngInject';

    Object.assign(this, { $stateParams, moment, OrderService, Helper });

    this.OrderService.getOrdersWithParam(this.$stateParams.id).then(order => {
      this.order = order;
      (order.invites || [])
        .filter(invite => angular.isString(invite.length))
        .forEach(invite => invite.length = (invite.length - 0) * 60);
    });

    this.type = $stateParams.type;
    this.isHistory = this.type === 'history';
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
