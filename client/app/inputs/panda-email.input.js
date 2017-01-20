import TouchedInvalidDirective from './touched-invalid.directive';
import InputWrapperComponent from './input-wrapper.component';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len

export default angular.module('pandaEmailInput', [
  InputWrapperComponent,
  TouchedInvalidDirective
]).component('pandaEmailInput', {
  bindings: { model: '=', isReadOnly: '<', ngTabindex: '@' },
  controller ( ) { this.EMAIL_PATTERN = EMAIL_PATTERN; },
  template: `
<input-wrapper name="email" field="E-mail" maxlength-label="Max 100 characters allowed">
    <input type="text" name="email" tabindex="{{::$ctrl.ngTabindex || -1}}"
           required touched-invalid ng-readonly="$ctrl.isReadOnly"
           ng-pattern="$ctrl.EMAIL_PATTERN"
           ng-maxlength="50"
           ng-model="$ctrl.model.email"/>
</input-wrapper>`
}).name;
