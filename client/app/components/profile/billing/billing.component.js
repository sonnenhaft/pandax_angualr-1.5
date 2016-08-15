import template from './billing.html';
import controller from './billing.controller';

let billingComponent = {
  restrict: 'E',
  bindings: {
  	billingInfo: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default billingComponent;
