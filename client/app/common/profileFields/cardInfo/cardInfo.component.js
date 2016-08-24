import template from './cardInfo.html';

let cardInfoComponent = {
  restrict: 'E',
  bindings: {
    formObject: '=',
    model: '=',
    output: '&'
  },
  template,
  controllerAs: 'vm'
};

export default cardInfoComponent;
