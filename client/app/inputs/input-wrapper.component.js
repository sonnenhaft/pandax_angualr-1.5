import ngMessages from 'angular-messages';

export default angular.module('inputWrapper', [
  ngMessages
]).component('inputWrapper', {
  bindings: { name: '@', field: '@', maxlengthLabel: '@', patternLabel: '@' },
  require: { form: '^form' },
  transclude: true,
  controller ($element) {
    'ngInject';

    this.$element = $element;
  },
  template: `
 <div class="input-wrapper">
    <label>{{::$ctrl.field}}</label>
    <div ng-transclude></div>
    <div ng-messages="$ctrl.form[$ctrl.name].$error" class="validation-messages animated fadeIn" role="alert">
      <messages field="{{::$ctrl.field}}" maxlength-label="{{::$ctrl.maxlengthLabel}}" pattern-label="{{::$ctrl.patternLabel}}"></messages>
    </div>
  </div>`
}).name;

