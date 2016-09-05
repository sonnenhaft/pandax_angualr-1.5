import template from './orderDetails.html';
import controller from './orderDetails.controller';

let orderDetailsComponent = {
  restrict: 'E',
  bindings: {
    order: '='
  },
  template,
  controller
};

export default orderDetailsComponent;
