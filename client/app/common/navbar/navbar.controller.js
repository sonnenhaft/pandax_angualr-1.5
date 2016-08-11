class NavbarController {

  constructor (Storage, Constants, $state, $window) {
    'ngInject';

    _.assign(this, {Constants, $state});

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session && this.session.user && this.session.user.type === 'customer';
    this.isProvider = this.session && this.session.user && this.session.user.type === 'provider';

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
