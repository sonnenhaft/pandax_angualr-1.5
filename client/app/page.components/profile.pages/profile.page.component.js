import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './profile.page.html';

export default angular.module('profile', [
  uiRouter
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.profile', {
    url: '/profile',
    abstract: true,
    parent: 'main',
    component: 'profile'
  });
}).component('profile', {
  template
}).name;
