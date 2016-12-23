import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './contact-us.page.html';

const componentName = 'contactUsPage';
export default angular.module(componentName, [
  uiRouter
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.contact-us', {
    url: '/contact-us',
    parent: 'main',
    component: componentName
  });
}).component(componentName, {
  template
}).name;
