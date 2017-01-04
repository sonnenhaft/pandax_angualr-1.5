import template from './<%= dashName %>.html';
import './<%= dashName %>.scss';

class controller {
  constructor() {
    'ngInject'

  }
}

export default angular.module('<%= name %>', [
  uiRouter
]).component('<%= name %>', {
  bindings: {},
  template,
  controller
}).name;
