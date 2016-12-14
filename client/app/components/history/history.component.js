import template from './history.html';
import controller from './history.controller';

let historyComponent = {
  bindings: {
  	isOnPending: '<'
  },
  template,
  controller
};

export default historyComponent;
