import template from './entertainers.html';
import controller from './entertainers.controller';

let entertainersComponent = {
  restrict: 'E',
  bindings: {
  	entertainers: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default entertainersComponent;
