import angular from 'angular';
import messages from '../messages.component';

import template from './card-info.html';

class controller {
  constructor (stripe, User) {
    'ngInject';

    this.stripe = stripe;
    this.isCustomer = User.get('role') === 'customer';
  }

  checkCardNumber ( ) {
    const validationKey = this.isCustomer ? 'invalid_credit_card_number' : 'invalid_card_number';
    this.formObject.card_number.$setValidity(validationKey, this.stripe.card.validateCardNumber(this.model.number));
  }

  checkCardExpiry ( ) {
    this.formObject.expiry.$setValidity('invalid_card_expiry', this.stripe.card.validateExpiry(this.model.expiry));
  }

  checkCardCvc ( ) {
    this.formObject.cvc.$setValidity('invalid_card_cvc', this.stripe.card.validateCVC(this.model.cvc));
  }
}


export default angular.module('cardInfo', [
  messages
]).component('cardInfo', {
  bindings: { formObject: '=', model: '=', },
  template,
  controller
}).name;
