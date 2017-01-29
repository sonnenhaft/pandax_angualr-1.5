import timer from '../../../common/timer.directive';
import showInTime from '../../../common/show-in-time.directive';

import template from './order-confirm.page.component.html';

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

const name = 'orderConfirm';
export default angular.module(name, [
  timer,
  showInTime
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/:orderId/order-confirm',
    parent: 'main',
    name,
    component: name
  });
}).component(name, {
  template,
  controller
}).name;
