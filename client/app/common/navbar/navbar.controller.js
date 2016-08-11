class NavbarController {

  constructor (Storage, Constants, $state, $window) {
    'ngInject';

    _.assign(this, {
      Constants, 
      $state, 
      activeMenuItemUrl: '', 
      activeMenuItemOpened: false
    });

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session && this.session.user && this.session.user.type === 'customer';
    this.isProvider = this.session && this.session.user && this.session.user.type === 'provider';

    this.avatar = this.showUserAvatar();
    this.navigation = _.filter(Constants.user.navigation, {role: this.session.user.type});
    this.submenu = _.filter(Constants.user.submenu, {role: this.session.user.type});
    this.mobile = false;

    $window.addEventListener('resize', () => {
      if ($window.innerWidth <= 960) {
        this.mobile = false;
      }
    });

  }

  showUserAvatar () {
    return this.Constants.user.avatar.empty;
  }

  switchMenuItem (menuItemUrl) {
    this.activeMenuItemUrl = menuItemUrl;
    this.activeMenuItemOpened = !this.activeMenuItemOpened;
  }

}

export default NavbarController;
