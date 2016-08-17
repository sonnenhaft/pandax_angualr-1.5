import template from './reset.html';
import controller from './reset.controller';

let resetComponent = {
  restrict: 'E',
  bindings: {
    output: '&'
  },
  template,
  controller
};

export default resetComponent;
