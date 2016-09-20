import template from './searchEntertainers.html';
import controller from './searchEntertainers.controller';

let searchEntertainersComponent = {
  restrict: 'E',
  bindings: {
  	entertainers: '=',
  	itemActiveIndex: '=',
  	entertainersInvited: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default searchEntertainersComponent;
