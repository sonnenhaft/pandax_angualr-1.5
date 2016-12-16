import template from './restore.html';
import controller from './restore.controller';

let restoreComponent = {
  bindings: {
    output: '&'
  },
  template,
  controller
};

export default restoreComponent;
