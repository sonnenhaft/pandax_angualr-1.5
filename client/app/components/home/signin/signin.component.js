import template from './signin.html';
import controller from './signin.controller';

let signinComponent = {
  restrict: 'E',
  bindings: {
    output: '&'
  },
  template,
  controller
};

export default signinComponent;
