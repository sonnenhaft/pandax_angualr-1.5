class NavbarAdminController {

  constructor (User, Constants, $state, $window) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      $state
    });

    // this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf('admin') >= 0);
    this.mobile = false;

    $window.addEventListener('resize', () => {
      if ($window.innerWidth <= 960) {
        this.mobile = false;
      }
    });

  }
}

export default NavbarAdminController;