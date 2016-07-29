class NavbarController {

  constructor (Storage, Constants) {
    'ngInject';

    _.assign(this, {Constants});

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';

    this.avatar = this.showUserAvatar();
    this.navigation = Constants.user.navigation[this.session.user.type];
    this.profile = Constants.user.profile.uri[this.session.user.type];

  }

  showUserAvatar () {
    return this.Constants.user.avatar.empty;
  }

}

export default NavbarController;
