import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './create-profile.page.html';

class controller {
  constructor ($state) {
    'ngInject';

    this.$state = $state;
  }
}

export default angular.module('profileCreate', [
  uiRouter
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.profile.create', {
    url: '/create',
    parent: 'profile',
    component: 'profileCreate'
  });
}).component('profileCreate', {
  template,
  controller
}).name;
