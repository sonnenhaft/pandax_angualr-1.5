import template from './signin.html';
import controller from './signin.controller';

let signinComponent = {
  bindings: {
    output: '&'
  },
  template,
  controller
};

export default signinComponent;
