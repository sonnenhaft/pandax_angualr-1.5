class ProfileCreateController {

  constructor (Storage) {
    'ngInject';

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';
    this.email = this.session.user.email;

    this.providers = this.typesOfPrivider();

  }

  onReady (profile) {
    if (!this.getActiveObject(this.providers) && this.isProvider) {
      this.typeError = true;
      return false;
    }

    if (this.isProvider) {
      this.session.user = _.assign(this.session.user, {
        username: this.username,
        provider_id: this.getActiveObject(this.providers).id
      });
    }

    this.session.user = _.assign(this.session.user, profile, {auth: true});

    console.log(this.session.user);
  }

  validate (field) {
    console.log(field);
  }

  typesOfPrivider () {
    const types = [
      {
        id: 'prime_xx',
        name: 'Prime XX',
        cost: 250,
        desc: '',
        img: '/assets/images/services/prime_xx.png',
        active: false
      },
      {
        id: 'prime_x',
        name: 'Prime X',
        cost: 150,
        desc: '',
        img: '/assets/images/services/prime.png',
        active: false
      },
      {
        id: 'prime',
        name: 'Prime',
        cost: 50,
        desc: '',
        img: '/assets/images/services/prime.png',
        active: false
      }
    ];

    return types;
  }

  switchObjectActivity (arr, index) {
    this.typeError = false;
    _.map(arr, (object, i) => object.active = index === i);
  }

  getActiveObject (arr) {
    return _.find(arr, object => object.active === true);
  }

}

export default ProfileCreateController;
