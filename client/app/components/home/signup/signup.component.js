import template from './signup.html';
import controller from './signup.controller';

let signupComponent = {
  restrict: 'E',
  bindings: {
    output: '&'
  },
  template,
  controller
};

export default signupComponent;
