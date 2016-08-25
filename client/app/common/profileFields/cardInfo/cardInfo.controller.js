export default class cardInfoController {

  constructor (stripe) {
    'ngInject';

    _.assign(this, {
      stripe
    });

  }

  checkCardNumber () {
    this.formObject.card_number.$setValidity('invalid_card_number', this.stripe.card.validateCardNumber(this.model.number));
  }

  checkCardExpiry () {
    this.formObject.expiry.$setValidity('invalid_card_expiry', this.stripe.card.validateExpiry(this.model.expiry));
  }

  checkCvc () {
    this.formObject.cvc.$setValidity('invalid_card_cvc', this.stripe.card.validateCVC(this.model.cvc));
  }

}
