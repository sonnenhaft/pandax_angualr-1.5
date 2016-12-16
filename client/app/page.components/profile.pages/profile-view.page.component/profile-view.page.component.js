import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './profile-view.page.html';

class controller {
  constructor ($state, $stateParams) {
    'ngInject';

    this.$stateParams = $stateParams;
    this.mode = $state.current.name;

  }

  $onInit () {
    if (this.$stateParams.mode) {
      this.mode = this.$stateParams.mode;
    }
  }
}

export default angular.module('profileView', [
  uiRouter
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('main.profile.view', {
    url: '/view',
    parent: 'profile',
    params: {
      mode: null
    },
    component: 'profileView'
  });
}).component('profileView', {
  template,
  controller
}).name;
