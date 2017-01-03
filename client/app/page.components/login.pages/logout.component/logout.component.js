import StatefulAuthTokenService from '../login.page/StatefulAuthTokenService';
import template from './logout.html';

class controller {
  constructor (StatefulAuthTokenService, $mdDialog, StatefulUserData) {
    'ngInject';

    Object.assign(this, { StatefulAuthTokenService, $mdDialog, StatefulUserData });
  }

  logout ( ) {
    this.$mdDialog.hide( );
    this.StatefulAuthTokenService.logout( );
  }

  showWarning ($event) {
    $event.stopPropagation( );

    this.$mdDialog.show({
      parent: document.body,
      contentElement: '#logout-window',
      clickOutsideToClose: true
    });
  }
}

export default angular.module('logout', [
  StatefulAuthTokenService
]).component('logout', {
  template,
  controller
}).name;
