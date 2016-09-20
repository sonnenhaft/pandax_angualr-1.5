import template from './manipulationEntertainers.html';
import controller from './manipulationEntertainers.controller';

let manipulationEntertainersComponent = {
  restrict: 'E',
  bindings: {
  	entertainers: '=',
  	entertainersInvited: '=',
  	countOfRequiredEntertainers: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default manipulationEntertainersComponent;
