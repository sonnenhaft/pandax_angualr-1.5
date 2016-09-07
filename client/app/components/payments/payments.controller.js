export default class Payments {

  constructor (Cards, $mdToast) {
    'ngInject';

    _.assign(this, {
      Cards, 
      $mdToast
    });

    Cards.getCards()
      .then((data) => {
        this.cards = data;
      });
  }

  addCard (card) {
    this.saveLoading = true;
    this.Cards
      .add(card)
      .then(cards => {

        if (!cards.message) {
          this.cards = cards;
          this.add = false;
        }

        this.saveLoading = false;

        return cards;
      })
      .then(result => {
        if (result.message) {
          this.showError(result.message.message || result.message);
        } else {
          this.resetCardInfo();
        }
      });
  }

  showError (message) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .content(message || message.type)
        .position('top right')
        .hideDelay(200000)
        .action('OK')
    );
  }

  resetCardInfo () {
    this.newCard = {};
  }

}
