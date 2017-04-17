import timer from '../../../common/timer.directive';
import showInTime from '../../../common/show-in-time.directive';

import template from './confirmed-order.page.html';

class controller {
  timeToCleanCancel = 5;

  constructor (moment, $state, OrderService, Helper, $stateParams) {
    'ngInject';

    Object.assign(this, { moment, $state, OrderService, Helper, $stateParams });
  }

  $onInit ( ) {
    this.OrderService.fetchEntertainersConfirmed(this.$stateParams.orderId).then(( ) => {
      this.invites = this.OrderService.listConfirmed;
    });
  }

  cancelOrder ($event, invite) {
    const cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment( ) ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer($event, invite, cost).then(( ) => {
      this.Helper.showToast('Done');
    });
  }
}

const component = 'orderConfirm';
export default angular.module(component, [
  timer,
  showInTime
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/:orderId/order-confirm',
    name: component,
    parent: 'main',
    component
  });
}).component(component, {
  template,
  controller
}).name;
