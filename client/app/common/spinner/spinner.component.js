import template from './spinner.html';
import controller from './spinner.controller';

let spinnerComponent = {
  restrict: 'E',
  bindings: {
    input: '<',
    output: '&'
  },
  template,
  controller
};

export default spinnerComponent;
