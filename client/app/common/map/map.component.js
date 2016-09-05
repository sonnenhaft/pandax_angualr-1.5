import template from './map.html';
import controller from './map.controller';

let mapComponent = {
  restrict: 'E',
  bindings: {
    input: '<',
    output: '&'
  },
  template,
  controller
};

export default mapComponent;
