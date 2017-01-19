class controller {
  $onInit ( ) {
    this.fieldToDisplay = this.field ? `"${this.field}"` : 'This field';
    this.maxlengthLabelText = this.maxlengthLabel || `${this.fieldToDisplay} is too long`;
    this.patternLabelText = this.patternLabel || `${this.fieldToDisplay} is invalid`;
  }
}
export default angular.module('messages', []).component('messages', {
  bindings: { field: '@', maxlengthLabel: '@', patternLabel: '@' },
  controller,
  template: `
<p ng-message="required">{{::$ctrl.fieldToDisplay}} is required</p>
<p ng-message="minlength">{{::$ctrl.fieldToDisplay}} is too short</p>
<p ng-message="maxlength">{{::$ctrl.maxlengthLabelText}}</p>
<p ng-message="minAge">Minimum allowed age is 18 years</div>
<p ng-message="pattern">{{::$ctrl.patternLabelText}}</p>
<p ng-message="repeatPasswordEqual">Repeat password should equal password.</p>
<p ng-message="invalid_card_number">This debit card number is not valid.</p>
<p ng-message="invalid_credit_card_number">The card number is not a valid credit card number</p>
<p ng-message="phone_already_taken">
  The phone number cannot be used. Check the format and validity, and try again. 
  Contact us at <a href="mailTo:support@minxnow.com">support@minxnow.com</a> for more details.
</p>
<p ng-message="invalid_card_expiry">The card's expiration date is invalid.</p>
<p ng-message="invalid_card_cvc">The card's security code is invalid.</p>`
}).name;

