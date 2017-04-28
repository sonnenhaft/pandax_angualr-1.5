import timer from '../timer.directive';
import showInTime from '../show-in-time.directive';
import { canceledByProvider, canceledByCustomer } from '../ORDER_STATUSES';

import template from './invite-description.html';

class controller {
  CANCELABLE_MINUTES = 5

  constructor (moment, $state, OrderService, Helper) {
    'ngInject';

    const { displaying_name, first_name = '', last_name = '' } = this.invite.provider;
    this.name = displaying_name || (`${first_name} ${last_name}`);

    Object.assign(this, { moment, $state, OrderService, Helper });
  }

  cancelOrder ($event) {
    const { invite } = this;
    const cost = this.moment(invite.datetime).add(this.CANCELABLE_MINUTES, 'm') > this.moment( ) ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer($event, invite, cost).then(( ) => {
      this.Helper.showToast('Done');
    });
  }

  getCancellationReason ( ) {
    const { invite: { status: inviteStatus } } = this;
    return {
      [canceledByProvider]: 'Cancelled',
      [canceledByCustomer]: 'Cancelled by you'
    }[inviteStatus];
  }
}

const component = 'inviteDescription';
export default angular.module(component, [
  timer,
  showInTime
]).filter('pandaPhoneFilter', ( ) => phone => `${phone || ''}`.replace(/([\d+]{2})([\d]{3})([\d]{3})(.*)/, '$1 $2 $3-$4')).component(component, {
  template,
  controller,
  bindings: { invite: '<', hideButton: '<' }
}).config($compileProvider => {
  'ngInject';

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https|http|mailto|sms)/);
}).name;
