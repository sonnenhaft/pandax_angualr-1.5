import template from './confirmed-order.page.html';
import inviteDescription from '../../../common/invite-description.component/invite-description.component';

class controller {
  constructor (OrderService, $stateParams) {
    'ngInject';

    Object.assign(this, { OrderService, $stateParams });
  }

  $onInit ( ) {
    const orderId = this.$stateParams.orderId;
    this.OrderService.fetchConfirmedEntertainers(orderId).then(({ data: { items } = {} }) => {
      this.invites = items;
      this.OrderService.listConfirmed = items;
    });
  }
}

const component = 'orderConfirm';
export default angular.module(component, [
  inviteDescription
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
