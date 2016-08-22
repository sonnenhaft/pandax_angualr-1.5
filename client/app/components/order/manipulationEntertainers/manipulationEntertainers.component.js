import template from './manipulationEntertainers.html';
import controller from './manipulationEntertainers.controller';

let manipulationEntertainersComponent = {
  restrict: 'E',
  bindings: {
  	entertainersInvitedCount: '=',
  	entertainersConfirmedCount: '=',
  	entertainers: '=',
  	entertainersConfirmed: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default manipulationEntertainersComponent;
