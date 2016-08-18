import template from './orderTerms.html';
import controller from './orderTerms.controller';

let orderTermsComponent = {
  restrict: 'E',
  bindings: {
    order: '<'
  },
  template,
  controller
};

export default orderTermsComponent;
