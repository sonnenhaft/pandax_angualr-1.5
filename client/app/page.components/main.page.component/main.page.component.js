import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Resolve from '../../common-services/resolve.service';
import template from './main.page.html';

class controller {
  constructor(User) {
    'ngInject';

    Object.assign(this, {
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
