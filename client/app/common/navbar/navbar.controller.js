class NavbarController {

  constructor (User, Constants, $state, $window) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      $state
    });

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';

    this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.submenu = _.filter(Constants.user.submenu, navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.mobile = false;
  }

  hideSubMenu(item) {
    if (item.url.length) {
      this.mobile = false;
    }
  }
}

export default NavbarController;
