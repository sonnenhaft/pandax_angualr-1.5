import messages from './messages.component';
import TouchedInvalidDirective from './touched-invalid.directive';

class controller {
  constructor(stripe, StatefulUserData, $stateParams) {
    'ngInject';

    this.stripeCardValidations = stripe.card;
    this.isCustomer = StatefulUserData.isCustomer();
    this.$stateParams = $stateParams;
  }

  $onInit() {
    if ( this.$stateParams.stub ) {
      this.model = { number: '5200828282828210 ', expiry: '12/18', cvc: 123, zip: 123456 };
    }
    this.model = this.model || {};
  }

  checkCardNumber() {
    const validationKey = this.isCustomer ? 'invalid_credit_card_number' : 'invalid_card_number';
    this.form.number.$setValidity(validationKey, this.stripeCardValidations.validateCardNumber(this.model.number));
  }

  checkCardExpiry() {
    this.form.expiry.$setValidity('invalid_card_expiry', this.stripeCardValidations.validateExpiry(this.model.expiry));
  }

  checkCardCvc() {
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
           ng-model="$ctrl.model.number"
           placeholder="3141 5926 5358 9793"/>
</input-wrapper>

<div layout="row">
    <input-wrapper name="expiry" field="Exp">
        <input type="text" name="expiry"
               ng-required="$ctrl.isRequired" touched-invalid
               ng-change="$ctrl.checkCardExpiry()"
               valid-thru-formatter
               placeholder="MM/YY"
               ng-model="$ctrl.model.expiry"/>
    </input-wrapper>

    <div style="min-width: 1px"></div>

    <input-wrapper name="cvc" field="CVC">
        <input type="text" name="cvc"
               ng-required="$ctrl.isRequired" touched-invalid
               ng-change="$ctrl.checkCardCvc()"
               placeholder="123"
               ng-model="$ctrl.model.cvc"/>
    </input-wrapper>

    <div style="min-width: 1px"></div>

    <input-wrapper name="zip" field="Zip code">
        <input type="text" name="zip"
               ng-required="$ctrl.isRequired" touched-invalid
               placeholder="12345"
               ng-model="$ctrl.model.zip"/>
    </input-wrapper>
</div>`,
  controller
}).directive('pandaCardFormatter', () => {
  'ngInject';

  const addSpacesToCard = card => card && card.replace(/(\d{4}(?!\s))/g, '$1 ').substr(0, 16 + 3)

  return {
    require: '^ngModel',
    priority: 1,
    link: ($scope, $element, $attrs, { $formatters, $parsers }) => {
      $formatters.push(addSpacesToCard);

      $element.on('keyup', () => {
        const val = $element.val();
        if ( val.length > 16 + 3 ) {
          $element.val(val.substr(0, 16 + 3))
        }
      })

      $scope.$on('$destroy', () => $element.off())

      $parsers.push(card => {
        const cardValue = card && card.replace(/\s/g, '');
        $element.val(addSpacesToCard(cardValue));
        return cardValue;
      });
    }
  };
}).directive('validThruFormatter', () => {
  'ngInject';

  return {
    require: '^ngModel',
    priority: 1,
    link: ($scope, $element, $attrs, { $formatters, $parsers }) => {
      let backspaceClicked = false;
      const formatValidThruValue = (validThru = '') => {
        let newCard = validThru;
        if ( validThru.length === 2 && validThru.indexOf('/') !== -1 ) {
          newCard = `0${validThru}`;
        }

        if ( newCard.length > 2 ) {
          newCard = newCard.replace('/', '');
          const end = Math.min(4, newCard.length);
          let month = Math.max(1, Math.min(newCard.substring(0, 2), 12));
          if ( month < 10 ) {
            month = `0${month}`;
          }
          const year = newCard.substring(2, end);
          newCard = `${month}/${year}`;
        } else if ( newCard.length === 2 && newCard.indexOf('/') === -1 && !backspaceClicked ) {
          newCard = `${newCard}/`;
        }

        backspaceClicked = false;

        if ( newCard === validThru ) {
          return validThru;
        } else {
          $element.val(newCard);
          return newCard;
        }
      };

      $element.bind('keydown', event=>{
        if (event.which === 8) {
          backspaceClicked = true;
        }
      });

      $element.on('keyup', () => {
        const val = $element.val();
        if ( val.length > 5 ) {
          $element.val(val.substr(0, 5))
        }
      })

      $scope.$on('$destroy', () => $element.off())

      $formatters.unshift(formatValidThruValue);
      $parsers.push((validThru = '') => {
        const val = formatValidThruValue(validThru);
        $element.val(val);
        return val;
      });
    }
  };
}).name;
