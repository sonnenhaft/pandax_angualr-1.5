import template from './orderConfirm.html';
import controller from './orderConfirm.controller';

let orderConfirmComponent = {
  bindings: {
  	invites: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default orderConfirmComponent;
