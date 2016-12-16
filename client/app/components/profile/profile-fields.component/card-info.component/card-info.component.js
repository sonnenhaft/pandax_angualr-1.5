import angular from 'angular';
import messages from '../../../../common/messages/messages';

import template from './card-info.html';
class controller {

  constructor(stripe) {
    'ngInject';

    this.stripe = stripe;
  }

  checkCardNumber() {
    this.formObject.card_number.$setValidity('invalid_card_number', this.stripe.card.validateCardNumber(this.model.number));
  }

  checkCardExpiry() {
    this.formObject.expiry.$setValidity('invalid_card_expiry', this.stripe.card.validateExpiry(this.model.expiry));
  }

  checkCardCvc() {
    this.formObject.cvc.$setValidity('invalid_card_cvc', this.stripe.card.validateCVC(this.model.cvc));
  }
}


export default angular.module('cardInfo', [
  messages
]).component('cardInfo', {
  bindings: {
    formObject: '=',
    model: '=',
    output: '&'
  },
  template,
  controller
}).name;
