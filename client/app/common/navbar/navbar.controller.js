class NavbarController {

  constructor (User, Constants, $state, $window) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      $state,
      activeMenuItemUrl: '',
      activeMenuItemOpened: false
    });

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';

    this.avatar = this.showUserAvatar();
    this.navigation = _.filter(Constants.user.navigation, {role: User.get('role')});
    this.submenu = _.filter(Constants.user.submenu, {role: User.get('role')});
    this.mobile = false;

    $window.addEventListener('resize', () => {
      if ($window.innerWidth <= 960) {
        this.mobile = false;
      }
    });

  }

  showUserAvatar () {
    if (!this.User.get('photo')) {
      return this.Constants.user.avatar.empty;
    }

    return this.isCustomer ?
      this.User.get('photo').preview :
      _.head(this.User.get('photos')).preview;
  }

  switchMenuItem (menuItemUrl) {
    this.activeMenuItemUrl = menuItemUrl;
    this.activeMenuItemOpened = !this.activeMenuItemOpened;
  }

}

export default NavbarController;
