export default class Payments {

  constructor (User, Cards, $mdToast) {
    'ngInject';

    _.assign(this, {User, Cards, $mdToast});

    this.cards = User.billingInfo.cards;

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

}
