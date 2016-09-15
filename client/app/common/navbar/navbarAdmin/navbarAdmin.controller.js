class NavbarAdminController {

  constructor (User, Constants, $state) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      $state,
      collapsed: false
    });

    // this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf('admin') >= 0);

  }
}

export default NavbarAdminController;