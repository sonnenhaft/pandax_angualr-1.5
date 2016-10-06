import template from './history.html';
import controller from './history.controller';

let historyComponent = {
  restrict: 'E',
  bindings: {
  	isOnPending: '<'
  },
  template,
  controller
};

export default historyComponent;
