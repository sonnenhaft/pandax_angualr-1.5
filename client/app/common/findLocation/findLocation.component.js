import template from './findLocation.html';
import controller from './findLocation.controller';

let findLocationComponent = {
  restrict: 'E',
  bindings: {
    input: '<',
    output: '&'
  },
  template,
  controller
};

export default findLocationComponent;
