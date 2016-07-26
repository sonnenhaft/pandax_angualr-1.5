class ProfileCreateController {

  constructor (Storage) {
    'ngInject';

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';
    this.email = this.session.user.email;

  }

  onReady (profile) {
    console.log(profile);
  }

  validate (field) {
    console.log(field);
  }

}

export default ProfileCreateController;
