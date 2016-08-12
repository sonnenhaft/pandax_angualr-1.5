import template from './restore.html';
import controller from './restore.controller';

let restoreComponent = {
  restrict: 'E',
  bindings: {
    output: '&'
  },
  template,
  controller
};

export default restoreComponent;
