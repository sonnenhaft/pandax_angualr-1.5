import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './pandax-terms.html';
import './pandax-terms.scss';

const componentName = 'pandaxTermsPageComponent';
export default angular.module(componentName, [
  uiRouter
]).component(componentName, {
  template
}).name;
