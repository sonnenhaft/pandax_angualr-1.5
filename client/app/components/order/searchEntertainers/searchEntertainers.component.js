import template from './searchEntertainers.html';
import controller from './searchEntertainers.controller';

let searchEntertainersComponent = {
  restrict: 'E',
  bindings: {
  	entertainers: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default searchEntertainersComponent;
