import template from './main.html';
import controller from './main.controller';

let mainComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default mainComponent;
