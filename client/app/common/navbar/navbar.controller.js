class NavbarController {

  constructor (Storage, Constants, $state) {
    'ngInject';

    _.assign(this, {Constants, $state});

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';

    this.avatar = this.showUserAvatar();
    this.navigation = Constants.user.navigation;
    this.additional = Constants.user.additionally;

  }

  showUserAvatar () {
    return this.Constants.user.avatar.empty;
  }

}

export default NavbarController;
