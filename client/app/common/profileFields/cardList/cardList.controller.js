export default class cardListController {

  constructor (Cards) {
    'ngInject';

    _.assign(this, {
      Cards,
      saveLoading: false,
    });
  }

  setDefaultCard () {
    this.saveLoading = true;
    this.Cards.setDefaultCard(this.Cards.defaultCardId)
      .then((data) => {
        return data;
      })
      .then((_data) => {
        this.saveLoading = false;
      })
  }

  deleteCard (cardId) {
    this.saveLoading = true;
    this.Cards.deleteCard(cardId)
      .then((data) => {
        return data;
      })
      .then((_data) => {
        this.saveLoading = false;
      })
  }

}
