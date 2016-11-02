export default class logoutController {

  constructor(User, $mdDialog) {
    'ngInject';

    _.assign(this, {User, $mdDialog});
  }

  logout() {
    this.$mdDialog.hide();
    this.User.logout();
  }

  showWarning(event) {
    event.stopPropagation();

    this.$mdDialog
      .show({
        parent: document.body,
        contentElement: '#logout-window',
        clickOutsideToClose: true
      });
  }

}
