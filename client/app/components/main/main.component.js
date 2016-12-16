import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Resolve from '../../services/resolve/resolve';
import template from './main.html';

class controller {
  constructor(User) {
    'ngInject';

    _.assign(this, {
      User,
      userAvatarSrc: ''
    });

    this.User.fetchUserAvatarSrc();
  }

}

export default angular.module('main', [
  uiRouter,
  Resolve
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('main', {
    url: '/main',
    abstract: true,
    component: 'main',
    resolve: {
      providers: Resolve => Resolve.providers()
    }
  });
}).component('main', {
  template,
  controller
}).name;
