import template from './orderConfirm.html';
import controller from './orderConfirm.controller';

let orderConfirmComponent = {
  restrict: 'E',
  bindings: {
  	invites: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default orderConfirmComponent;
