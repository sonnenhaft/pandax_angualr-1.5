import template from './confirmed-order.page.html';
import inviteDescription from '../../../common/invite-description.component/invite-description.component';

class controller {
  constructor (OrderService, $stateParams) {
    'ngInject';

    Object.assign(this, { OrderService, $stateParams });
  }

  $onInit ( ) {
    this.OrderService.fetchEntertainersConfirmed(this.$stateParams.orderId).then(( ) => {
      this.invites = this.OrderService.listConfirmed;
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
