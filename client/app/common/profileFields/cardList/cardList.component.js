import template from './cardList.html';
import controller from './cardList.controller';
import './cardList.scss';

let cardListComponent = {
  restrict: 'E',
  bindings: {
    cards: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default cardListComponent;
