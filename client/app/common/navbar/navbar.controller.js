class NavbarController {

  constructor (User, Constants, $state, $window) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      $state
    });

    this.navigation = _.filter(Constants.user.navigation, {role: User.get('role')});
    this.submenu = _.filter(Constants.user.submenu, {role: User.get('role')});
    this.mobile = false;

    $window.addEventListener('resize', () => {
      if ($window.innerWidth <= 960) {
        this.mobile = false;
      }
    });

  }
}

export default NavbarController;
