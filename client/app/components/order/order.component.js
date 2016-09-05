import template from './order.html';
import controller from './order.controller';

let orderComponent = {
  restrict: 'E',
  bindings: {
    providers: '='
  },
  template,
  controller
};

export default orderComponent;
