import TouchedInvalidDirective from './touched-invalid.directive';
import InputWrapperComponent from './input-wrapper.component';

const PHONE_PATTERN = /(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}/;

export default angular.module('commonUserFields', [
  InputWrapperComponent,
  TouchedInvalidDirective
]).component('commonUserFields', {
  require: { form: '^form' },
  bindings: { model: '=', isReadOnly: '<' },
  controller ( ) { this.PHONE_PATTERN = PHONE_PATTERN; },
  template: `
<div layout="row">
    <input-wrapper name="first_name" field="First Name">
        <input type="text" name="first_name"
               required touched-invalid ng-readonly="$ctrl.isReadOnly"
               ng-maxlength="50"
               ng-model="$ctrl.model.first_name"/>
    </input-wrapper>

    <div style="min-width: 1px"></div>

    <input-wrapper name="last_name" field="Last Name">
        <input type="text" name="last_name"
               required touched-invalid ng-readonly="$ctrl.isReadOnly"
               ng-maxlength="50"
               ng-model="$ctrl.model.last_name"/>
        <div class="sub-label" ng-hide="$ctrl.isReadOnly">We won't display your last name</div>
    </input-wrapper>
</div>

<input-wrapper name="phone" field="Phone Number">
    <div class="sub-label-right" ng-hide="$ctrl.isReadOnly">Example: +1 234 567-8900</div>
    <input type="text" name="phone"
           required touched-invalid ng-readonly="$ctrl.isReadOnly" panda-phone-formatter
           ng-maxlength="16"           
           ng-pattern="$ctrl.PHONE_PATTERN"
           ng-change="$ctrl.form.phone.$setValidity('phone_already_taken', true)"
           ng-model="$ctrl.model.phone"/>
</input-wrapper>`
}).directive('pandaPhoneFormatter', ($timeout, asPhoneFilter) => {
  'ngInject';

  return {
    require: '^ngModel',
    priority: 1,
    link: (i, $element, $attrs, { $formatters, $parsers }) => {
      const formatCardValue = phone => {
        phone = asPhoneFilter(phone);
        $timeout(( ) => $element.val(phone), 0, false);
        const resultCard = phone.replace(/[^\d]/g, '');
        return resultCard.length === 1 ? '' : resultCard;
      };

      $parsers.push(formatCardValue);
      $formatters.unshift(formatCardValue);
    }
  };
}).filter('asPhone', ( ) => (phone, noEmpty) => {
  phone = phone || '';
  if (phone) {
    phone = phone.replace(/[^\d]/g, '');
    if (phone.indexOf('1') === 0) {
      phone = phone.slice(1);
    }
    if (phone.length > 3 && phone.length < 7) {
      phone = phone.replace(/(\d{3})(.+)/g, '$1 $2');
    } else if (phone.length > 6) {
      phone = phone.replace(/(\d{3})(\d{3})(.+)/g, '$1 $2-$3');
    }
  }
  if (!phone && noEmpty) {
    return phone;
  } else {
    return `+1 ${phone}`;
  }
}).name;
