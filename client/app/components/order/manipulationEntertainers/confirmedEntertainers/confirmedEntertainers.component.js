import template from './confirmedEntertainers.html';
import controller from './confirmedEntertainers.controller';

let confirmedEntertainersComponent = {
  restrict: 'E',
  bindings: {
  	entertainers: '=',
  	countOfRequiredEntertainers: '=',
  	serviceTypePrice: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default confirmedEntertainersComponent;
