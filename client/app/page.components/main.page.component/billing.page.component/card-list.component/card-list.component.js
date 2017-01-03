import template from './card-list.component.html';
import './card-list.component.scss';

class controller {
  constructor (Cards, User) {
    'ngInject';

    Object.assign(this, { Cards, User });
    this.saveLoading = false;
  }

  setDefaultCard ( ) {
    this.saveLoading = true;
    this.Cards.setDefaultCard(this.Cards.defaultCardId).then(( ) => {
      this.saveLoading = false;
    });
  }

  deleteCard (cardId) {
    this.saveLoading = true;
    this.Cards.deleteCard(cardId).then(( ) => {
      this.saveLoading = false;
    });
  }
}

export default angular.module('cardList', []).component('cardList', {
  bindings: { cards: '<' },
  template,
  controller
}).name;
