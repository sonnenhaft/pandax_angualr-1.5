import template from './manipulationEntertainers.html';
import controller from './manipulationEntertainers.controller';

let manipulationEntertainersComponent = {
  bindings: {
  	entertainers: '=',
  	entertainersInvited: '=',
  	countOfRequiredEntertainers: '=',
  	serviceTypePrice: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default manipulationEntertainersComponent;
