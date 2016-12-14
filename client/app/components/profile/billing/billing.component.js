import template from './billing.html';
import controller from './billing.controller';

let billingComponent = {
  bindings: {
  	billingInfo: '=',
    orderDetails: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default billingComponent;
