import template from './historyMinx.html';
import controller from './historyMinx.controller';

let historyMinxComponent = {
  restrict: 'E',
  bindings: {
    order: '<'
  },
  template,
  controller
};

export default historyMinxComponent;
