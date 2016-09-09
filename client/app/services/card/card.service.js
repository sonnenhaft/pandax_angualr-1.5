export default class Cards {

  constructor (User, Constants, Request, stripe) {
    'ngInject';

    _.assign(this, {
      User, 
      Constants, 
      Request, 
      stripe,
      list: [],
      defaultCardId: 0
    });

  }

  add (card) {
    return this
      .stripeCreateToken(this.makeCard(card))
      .then((data) => data.id)
      .catch(error => {
        throw error;
      })
      .then(token => {

        return this
          .Request
          .send(
            this.User.token(),
            this.Constants.api.cards.add.method,
            this.Constants.api.cards.add.uri(this.User.get('role')),
            {token}
          )
          .then(
            card => {
              if (card.data && card.data.detail) {
                return card.data.detail;
              }

              return card.data;
            },
            error => console.log(error)
          );

      })
      .catch(error => error)
      .then(card => {

        if (!card) {
          return {message: 'Something went wrong with server communication'};
        }

        if (card.id) {
          this.User.billingInfo = _.assign(
            this.User.billingInfo, {
              cards: _
                .chain(this.User.billingInfo.cards)
                .map(c => {
                  c.is_default = false;
                  return c;
                })
                .union([card])
                .value()
            }
          );

          // return this.User.billingInfo.cards;
          this.addCardToList(card);
          return this.list;
        }

        return {message: card};
      })
      .catch(error => error);
  }

  makeCard (card) {
    let exp = card.expiry.replace(/\/+/g, '/').split('/');

    if (exp.length < 2) {
      exp = card.expiry.replace(/\-+/g, '-').split('-');
    }

    return {
      number: card.number,
      cvc: card.cvc,
      exp_month: exp[0],
      exp_year: exp[1],
      address_zip: card.zip
    };
  }

  /*
   Stripe communication
   */
  stripeCreateToken (card) {
    return this.stripe.card.createToken(card)
  }

  getCards () {
    return this
      .Request
      .send(
        this.User.token(),
        this.Constants.api.cards.get.method,
        this.Constants.api.cards.get.uri(this.User.get('role'))
      )
      .then(
        result => {
          this.list = result.data;
          this.setDefaultCardId();
          return this.list;
        },
        error => console.log(error)
      );
  }

  deleteCard (cardId) {
    return this
      .Request
      .send(
        this.User.token(),
        this.Constants.api.cards.delete.method,
        this.Constants.api.cards.delete.uri(this.User.get('role'), cardId)
      )
      .then(
        result => {
          this.deleteCardFromList(cardId);
          return result.data;
        },
        error => console.log(error)
      );
  }

  setDefaultCard (cardId) {
    return this
      .Request
      .send(
        this.User.token(),
        this.Constants.api.cards.setDefault.method,
        this.Constants.api.cards.setDefault.uri(this.User.get('role'), cardId)
      )
      .then(
        result => {
          this.updateCardInList(result.data);
          return result.data;
        },
        error => console.log(error)
      );
  }

  addCardToList (card) {
    this.resetCardsDefault();
    this.list.push(card);
    this.setDefaultCardId();
    return this.list;
  }

  updateCardInList (card) {
    this.resetCardsDefault();
    let itemIndex = _.findIndex(this.list, {id: card.id});
    this.list.splice(itemIndex, 1, card);
    this.setDefaultCardId();
  }

  deleteCardFromList (id) {
    let itemIndex = _.findIndex(this.list, {id: id});
    this.list.splice(itemIndex, 1);
  }

  resetCardsDefault () {
    this.list.forEach((card) => {
      card.is_default = false;
    });
    this.defaultCardId = 0;
  }

  setDefaultCardId () {
    let cardActive = (this.list.length && _.find(this.list, {is_default: true}));
    this.defaultCardId = cardActive ? cardActive.id : 0;
  }
}
