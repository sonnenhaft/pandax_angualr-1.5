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

    this.navigation = _.filter(Constants.user.navigation, {role: User.get('role')});
    this.submenu = _.filter(Constants.user.submenu, {role: User.get('role')});
    this.mobile = false;

    $window.addEventListener('resize', () => {
      if ($window.innerWidth <= 960) {
        this.mobile = false;
      }
    });

  }

  switchMenuItem (menuItemUrl) {
    this.activeMenuItemUrl = menuItemUrl;
    this.activeMenuItemOpened = !this.activeMenuItemOpened;
  }
}

export default NavbarController;