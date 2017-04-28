import template from './panda-button.html';
import './panda-button.scss';

const component = 'pandaButton';
export default angular.module(component, [
  'ngMaterial'
]).component(component, {
  bindings: {
    ngDisabled: '=',
    onClick: '&'
  },
  transclude: true,
  template
}).name;
