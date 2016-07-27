class ProfileCreateController {

  constructor (Storage, Validation) {
    'ngInject';

    _.assign(this, {Validation});

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';
    this.email = this.session.user.email;

    this.providers = this.typesOfPrivider();
    this.images = this.ImagesOfUser();
    this.fields = this.profileFields();

  }

  onReady (profile) {
    if (!this.getActiveObject(this.providers).length && this.isProvider) {
      this.typeError = true;
      return false;
    }

    if (!this.validate({images: this.images}) && this.isProvider) {
      return false;
    }

    if (this.isProvider) {
      this.session.user = _.assign(this.session.user, {
        displaying_name: this.displaying_name,
        service_types: this.getActiveObject(this.providers)
      });
    }

    this.session.user = _.assign(this.session.user, profile, {auth: true});

    console.log(this.images);
    console.log(this.session.user);
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        console.log(error);
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
  }

  profileFields () {
    const specific = [
      {
        name: 'Display Name',
        model: 'displaying_name',
        type: 'text'
      }
    ];

    const basic = [
      {
        combined: [
          {
            name: 'First Name',
            model: 'first_name',
            type: 'text'
          },
          {
            name: 'Last Name',
            model: 'last_name',
            type: 'text'
          }
        ]
      },
      {
        name: 'Phone Number',
        model: 'phone',
        type: 'number'
      },
      {
        name: 'Email',
        model: 'email',
        type: 'email'
      }
    ];

    return this.isProvider ? _.union(specific, basic) : basic;
  }

  typesOfPrivider () {
    const types = [
      {
        type: '1',
        name: 'Prime XX',
        price: 250,
        description: '',
        img: '/assets/images/services/prime_xx.png',
        active: false
      },
      {
        type: '2',
        name: 'Prime X',
        price: 150,
        description: '',
        img: '/assets/images/services/prime.png',
        active: false
      },
      {
        type: '3',
        name: 'Prime',
        price: 50,
        description: '',
        img: '/assets/images/services/prime.png',
        active: false
      }
    ];

    return types;
  }

  ImagesOfUser () {
    const images = [
      {file: ''},
      {file: ''},
      {file: ''}
    ];

    return this.isCustomer ? [_.head(images)] : images;
  }

  getActiveObject (arr) {
    return _.filter(arr, object => object.active === true);
  }

}

export default ProfileCreateController;
