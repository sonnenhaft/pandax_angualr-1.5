import angular from 'angular';
import User from '../../common-services/user.service';
import template from './logout.modal.html';

class controller {
  constructor (User, $mdDialog) {
    'ngInject';

    Object.assign(this, { User, $mdDialog });
  }

  logout ( ) {
    this.$mdDialog.hide( );
    this.User.logout( );
  }

  showWarning (event) {
    event.stopPropagation( );

    this.$mdDialog.show({
      parent: document.body,
      contentElement: '#logout-window',
      clickOutsideToClose: true
    });
  }
}

export default angular.module('logout', [
  User
]).component('logout', {
  template,
  controller
}).name;
