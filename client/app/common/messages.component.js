import angular from 'angular';

export default angular.module('messages', []).component('messages', {
  template: `
<p ng-message="required">This field is required</p>
<p ng-message="minlength">This field is too short</p>
<p ng-message="maxlength">This field is too long</p>
<p ng-message="email">This needs to be a valid email</p>
<p ng-message="repeatPasswordEqual">Repeat password should equal password.</p>
<p ng-message="invalid_card_number">This debit card number is not valid.</p>
<p ng-message="invalid_credit_card_number">The card number is not a valid credit card number</p>
<p ng-message="invalid_card_expiry">The card's expiration date is invalid.</p>
<p ng-message="invalid_card_cvc">The card's security code is invalid.</p>
`
}).name;

