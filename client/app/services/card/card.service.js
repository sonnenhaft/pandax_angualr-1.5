export default class Cards {

  constructor (User, Constants, Request, stripe) {
    'ngInject';

    _.assign(this, {User, Constants, Request, stripe});

  }

  add (card) {
    return this
      .stripeCreateToken(this.makeCard(card))
      .then((data) => data.id)
      .catch(error => error)
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
              if (card.data.detail) {
                return card.data.detail;
              }

              return card.data;
            },
            error => console.log(error)
          );

      })
      .catch(error => error)
      .then(card => {

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

          return this.User.billingInfo.cards;
        }

        return {message: card};
      })
      .catch(error => error);
  }

  makeCard (card) {
    let exp = card.expiry.split('/');

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
        result => result.data,
        error => console.log(error)
      );
  }
}
