import template from './orderTerms.html';
import controller from './orderTerms.controller';

let orderTermsComponent = {
  bindings: {
    order: '<'
  },
  template,
  controller
};

export default orderTermsComponent;
