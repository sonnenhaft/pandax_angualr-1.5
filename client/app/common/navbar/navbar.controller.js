class NavbarController {

  constructor (Storage, Constants) {
    'ngInject';

    _.assign(this, {Constants});

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';

    this.avatar = this.setUserPhoto();
    this.navigation = Constants.user.navigation[this.session.user.type];
    this.profile = Constants.user.profile.uri[this.session.user.type];

  }

  setUserPhoto () {
    if (this.session.user && this.session.user.auth) {
       return this.isCustomer ?
         this.session.user.photo.$ngfBlobUrl :
         _.head(this.session.user.photos.$ngfBlobUrl);
    }

    return this.Constants.user.avatar.empty;
  }

}

export default NavbarController;
