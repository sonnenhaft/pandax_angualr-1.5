import angular from 'angular';

import TouchedInvalidDirective from './touched-invalid.directive';
import template from './credentials-inputs.html';

class controller {
  submit ($event) {
    if (!this.form.$submitted) {
      this.form.$setSubmitted( );
    }
    if (this.form.$valid) {
      this.ajaxError = null;
      this.loading = true;
      this.onSubmit($event).then(
        result => this.ajaxError = (result || {}).error || (result || {}).message,
        error => this.ajaxError = error.message || error.data.message
      ).finally(( ) => this.loading = false);
    }
  }
}

export default angular.module('credentialsInputs', [
  TouchedInvalidDirective
]).component('credentialsInputs', {
  require: { form: '^form' },
  bindings: { credentials: '=', submitTitle: '@', onSubmit: '&', emailOnly: '<', passwordOnly: '<', forgotPasswordLink: '<' },
  controller,
  template
}).directive('repeatPasswordEqual', ( ) => ({
  require: ['^ngModel', '^form', TouchedInvalidDirective],
  link: ($scope, $element, $attr, controllers) => {
    const [ngModel, form] = controllers;
    const equalityNgModel = form[$attr.repeatPasswordEqual];

    const validate = val => {
      ngModel.$setValidity('repeatPasswordEqual', ngModel.$viewValue === equalityNgModel.$viewValue);
      ngModel.setTouchedInvalid( );
      return val;
    };

    equalityNgModel.$viewChangeListeners.unshift(validate);
    ngModel.$parsers.push(validate);
    ngModel.$setValidity('repeatPasswordEqual', false);
  }
})).name;
