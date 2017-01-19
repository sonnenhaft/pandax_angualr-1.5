import template from './restore.page.html';

export default angular.module('restorePage', []).component('restorePage', {
  template,
  controller (LoginResource, $mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.restorePassword = targetEvent => {
      const email = this.credentials.email;
      return LoginResource.restorePassword({}, { email }).$promise.then(( ) => {
        $mdDialog.show({
          contentElement: '#restore-success',
          parent: document.body,
          clickOutsideToClose: false,
          targetEvent
        });
      });
    };
  }
}).name;
