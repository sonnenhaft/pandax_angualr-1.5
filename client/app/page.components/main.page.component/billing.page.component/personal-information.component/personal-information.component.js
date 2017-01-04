import messages from '../../../../common/messages.component';

import template from './personal-information.html';

export default angular.module('personalInformation', [
  messages
]).component('personalInformation', {
  bindings: { formObject: '=', model: '=' },
  template
}).name;
