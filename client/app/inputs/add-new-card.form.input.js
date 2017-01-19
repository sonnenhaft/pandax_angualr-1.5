import messages from './messages.component';
import TouchedInvalidDirective from './touched-invalid.directive';

class controller {
  constructor (stripe, StatefulUserData) {
    'ngInject';

    this.stripeCardValidations = stripe.card;
    this.isCustomer = StatefulUserData.isCustomer( );
  }

  $onInit ( ) {
    this.model = this.model || {};
  }

  checkCardNumber ( ) {
    const validationKey = this.isCustomer ? 'invalid_credit_card_number' : 'invalid_card_number';
    this.form.number.$setValidity(validationKey, this.stripeCardValidations.validateCardNumber(this.model.number));
  }

  checkCardExpiry ( ) {
    this.form.expiry.$setValidity('invalid_card_expiry', this.stripeCardValidations.validateExpiry(this.model.expiry));
  }

  checkCardCvc ( ) {
    this.form.cvc.$setValidity('invalid_card_cvc', this.stripeCardValidations.validateCVC(this.model.cvc));
  }
}

export default angular.module('addNewCardForm', [
  TouchedInvalidDirective,
  messages
]).component('addNewCardForm', {
  require: { form: '^form' },
  bindings: { model: '=', isRequired: '<' },
  template: `
<input-wrapper name="number"  field="{{::$ctrl.isCustomer ? 'Card Number' : 'Debit Card Number'}}">
    <input type="text" name="number"
           ng-required="$ctrl.isRequired" touched-invalid  panda-card-formatter
           ng-change="$ctrl.checkCardNumber()"
           ng-model="$ctrl.model.number"/>
</input-wrapper>

<div layout="row">
    <input-wrapper name="expiry" field="Valid Thru">
        <input type="text" name="expiry"
               ng-required="$ctrl.isRequired" touched-invalid
               ng-change="$ctrl.checkCardExpiry()"
               ng-model="$ctrl.model.expiry"/>
    </input-wrapper>

    <div style="min-width: 1px"></div>

    <input-wrapper name="cvc" field="CVC">
        <input type="text" name="cvc"
               ng-required="$ctrl.isRequired" touched-invalid
               ng-change="$ctrl.checkCardCvc()"
               ng-model="$ctrl.model.cvc"/>
    </input-wrapper>

    <div style="min-width: 1px"></div>

    <input-wrapper name="zip" field="Zip code">
        <input type="text" name="zip"
               ng-required="$ctrl.isRequired" touched-invalid
               ng-model="$ctrl.model.zip"/>
    </input-wrapper>
</div>`,
  controller
}).directive('pandaCardFormatter', ( ) => {
  'ngInject';

  const addSpacesToCard = card => card && card.replace(/(\d{4}(?!\s))/g, '$1 ');
  return {
    require: '^ngModel',
    priority: 1,
    link: (i, $element, $attrs, { $formatters, $parsers }) => {
      $formatters.push(addSpacesToCard);
      $parsers.push(card => {
        const cardValue = card && card.replace(/\s/g, '');
        $element.val(addSpacesToCard(cardValue));
        return cardValue;
      });
    }
  };
}).name;
