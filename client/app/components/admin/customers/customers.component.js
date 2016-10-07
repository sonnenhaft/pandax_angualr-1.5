import template from './customers.html';
import controller from './customers.controller';

let customersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default customersComponent;
