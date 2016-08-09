class NavbarController {

  constructor (User, Constants, $state, $window) {
    'ngInject';

    _.assign(this, {Constants, $state});

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';

    this.avatar = this.showUserAvatar();
    this.navigation = Constants.user.navigation;
    this.additional = Constants.user.additionally;
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

}

export default NavbarController;
