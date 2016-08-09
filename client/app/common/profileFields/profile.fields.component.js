import template from './profile.fields.html';
import controller from './profile.fields.controller';

let profileFieldsComponent = {
  restrict: 'E',
  bindings: {
    mode: '<',
    output: '&'
  },
  template,
  controller
};

export default profileFieldsComponent;
