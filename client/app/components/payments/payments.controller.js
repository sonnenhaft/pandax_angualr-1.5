export default class Payments {

  constructor (User) {
    'ngInject';

    _.assign(this, {User});

    this.cards = User.billingInfo.cards;

  }

  addCard (card) {
    this.cards = _
      .chain(this.cards)
      .map(card => {
        card.default = false;
        return card;
      })
      .union([{
        id: this.cards.length + 1,
        cvc: card.cvc,
        expiry: card.expiry,
        number: card.number,
        name: 'Card ' + (this.cards.length + 1),
        default: true
      }])
      .value();

    this.User.billingInfo = _.assign(this.User.billingInfo, {cards: this.cards});
    this.add = false;
  }

}
