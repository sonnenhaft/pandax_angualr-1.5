import template from './select-input.html';

const component = 'selectInput';
export default angular.module(component, [
  'ngMaterial'
]).component(component, {
  transclude: true,
  bindings: {
    ngDisabled: '<',
    options: '<',
    selectedValue: '=',
    name: '@',
    label: '@'
  },
  template
}).name;

