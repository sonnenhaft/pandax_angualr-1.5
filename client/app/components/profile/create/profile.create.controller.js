class ProfileCreateController {

  constructor (Storage) {
    'ngInject';

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';
    this.email = this.session.user.email;

    this.providers = this.types();

  }

  onReady (profile) {
    console.log(profile);
  }

  validate (field) {
    console.log(field);
  }

  types () {
    const types = [
      {
        name: 'Prime XX',
        cost: 250,
        desc: '',
        img: '../../../../assets/images/services/prime_xx.png',
        active: false
      },
      {
        name: 'Prime X',
        cost: 150,
        desc: '',
        img: '../../../../assets/images/services/prime.png',
        active: false
      },
      {
        name: 'Prime',
        cost: 50,
        desc: '',
        img: '../../../../assets/images/services/prime.png',
        active: false
      }
    ];

    return types;
  }

  switchObjectActivity (arr, index) {
    _.map(arr, (object, i) => object.active = index === i);
  }

  getActiveObject (arr) {
    return _.find(arr, object => object.active === true);
  }

}

export default ProfileCreateController;
