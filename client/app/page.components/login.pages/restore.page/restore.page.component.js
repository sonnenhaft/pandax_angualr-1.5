import angular from 'angular';
import uiRouter from 'angular-ui-router';
import User from '../../../common-services/user.service';
import template from './restore.page.html';

class controller {
  constructor (User, $mdDialog) {
    'ngInject';

    Object.assign(this, { User, $mdDialog });
  }

  restorePassword (targetEvent) {
    return this.User.restore(this.credentials.email).then(result => {
      if (!result.error) {
        this.$mdDialog.show({
          contentElement: '#restore-success',
          parent: document.body,
          clickOutsideToClose: false,
          targetEvent
        });
      }
      return result;
    });
  }

  hideMessage ( ) {
    this.$mdDialog.hide( );
  }
}

export default angular.module('restorePage', [
  uiRouter,
  User
]).component('restorePage', {
  template,
  controller
}).name;
