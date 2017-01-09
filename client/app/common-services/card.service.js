import config from 'config';

class Cards {
  list = []
  defaultCardId = 0

  constructor ($http, stripe, $q, Helper, StatefulUserData) {
    'ngInject';

    Object.assign(this, { $http, stripe, $q, Helper, StatefulUserData });
  }

  add (card) {
    return this.stripeCreateToken(this.makeCard(card)).then(
        ({ id }) => id,
        error => {
          // All errors in response are displays in the http interceptors (look at 'app.js')
          // We need to display this one directly, 'cause this request sends to external resource (stripe.com)
          this.Helper.showToast(error.message || error);

          return this.$q.reject(error);
        })
      .then(token => this.$http.post('{{config_api_url}}/api/{{current_user_role}}/cards/add', { token }))
      .then(({ data: card }) => {
        card = card && card.detail ? card.detail : card;
        if (!card) {
          return { message: 'Something went wrong with server communication' };
        } else if (card.id) {
          this.billingInfo = Object.assign(this.billingInfo, {
            cards: _.chain(this.billingInfo.cards).map(card => {
              card.is_default = false;
              return card;
            }).union([card]).value( )
          });

          this.addCardToList(card);
          return this.list;
        } else {
          return { message: card };
        }
      });
  }

  makeCard (card) {
    let exp = card.expiry.replace(/\/+/g, '/').split('/');
    if (exp.length < 2) { exp = card.expiry.replace(/-+/g, '-').split('-'); }
    return { number: card.number, cvc: card.cvc, exp_month: exp[0], exp_year: exp[1], address_zip: card.zip, currency: 'usd' };
  }

  stripeCreateToken (card) { return this.stripe.card.createToken(card); }

  getCards ( ) {
    return this.$http.get('{{config_api_url}}/api/{{current_user_role}}/cards').then(result => {
      this.list = result.data;
      this.setDefaultCardId( );
      return this.list;
    });
  }

  deleteCard (cardId) {
    return this.$http.delete(`{{config_api_url}}/api/{{current_user_role}}/cards/${cardId}`).then(result => {
      this.deleteCardFromList(cardId);
      return result.data;
    });
  }

  setDefaultCard (cardId) {
    return this.$http.put(`{{config_api_url}}/api/{{current_user_role}}/cards/${cardId}/default`).then(result => {
      this.updateCardInList(result.data);
      return result.data;
    });
  }

  addCardToList (card) {
    if (card && card.is_default == true) { this.resetCardsDefault( ); }
    this.list.push(card);
    this.setDefaultCardId( );
    return this.list;
  }

  updateCardInList (card) {
    this.resetCardsDefault( );
    const itemIndex = _.findIndex(this.list, { id: card.id });
    this.list.splice(itemIndex, 1, card);
    this.setDefaultCardId( );
  }

  deleteCardFromList (id) {
    const itemIndex = _.findIndex(this.list, { id });
    this.list.splice(itemIndex, 1);
  }

  resetCardsDefault ( ) {
    this.list.forEach(card => { card.is_default = false; });
    this.defaultCardId = 0;
  }

  setDefaultCardId ( ) {
    const cardActive = (this.list.length && _.find(this.list, { is_default: true }));
    this.defaultCardId = cardActive ? cardActive.id : 0;
  }
}

export default angular.module('card', [
]).service('Cards', Cards).name;
