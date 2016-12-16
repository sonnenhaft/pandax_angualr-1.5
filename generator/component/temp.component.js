import angular from 'angular';
import uiRouter from 'angular-ui-router';
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
