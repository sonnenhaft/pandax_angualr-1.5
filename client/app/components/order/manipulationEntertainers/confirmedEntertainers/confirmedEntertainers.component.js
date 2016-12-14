import template from './confirmedEntertainers.html';
import controller from './confirmedEntertainers.controller';

let confirmedEntertainersComponent = {
  bindings: {
  	entertainers: '=',
  	countOfRequiredEntertainers: '<',
  	serviceTypePrice: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default confirmedEntertainersComponent;
