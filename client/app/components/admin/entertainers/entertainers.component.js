import template from './entertainers.html';
import controller from './entertainers.controller';
import './entertainers.scss';

let entertainersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default entertainersComponent;
