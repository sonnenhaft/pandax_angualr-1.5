import template from './map.html';
import controller from './map.controller';

let mapComponent = {
  restrict: 'E',
  bindings: {
    data: '='
  },
  template,
  controller
};

export default mapComponent;
