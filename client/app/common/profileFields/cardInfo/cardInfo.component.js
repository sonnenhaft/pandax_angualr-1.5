import template from './cardInfo.html';
import controller from './cardInfo.controller';

let cardInfoComponent = {
  restrict: 'E',
  bindings: {
    formObject: '=',
    model: '=',
    output: '&',
    messages: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default cardInfoComponent;
