class ProfileCreateController {

  constructor (Storage, Validation, Constants, $state) {
    'ngInject';

    _.assign(this, {Storage, Validation, Constants, $state});

    this.session = Storage.getObject('MINX');

    this.isCustomer = this.session.user.type === 'customer';
    this.isProvider = this.session.user.type === 'provider';
    this.email = this.session.user.email;

    this.providers = Constants.profile.serviceTypes;
    this.images = Constants.profile.images[this.session.user.type];
    this.fields = Constants.profile.fields[this.session.user.type];

  }

  onReady (profile) {
    if (!this.isProviderProfile() || !this.validate(profile)) {
      return false;
    }

    this.session.user = _.assign(
      this.session.user,
      profile,
      {
        auth: true
      },
      {
        [this.isCustomer ? 'photo' : 'photos']: this.isCustomer ?
          _.head(this.images).file :
          _.map(this.images, 'file')
      }
    );

    console.log(this.session.user);

    this.Storage.setObject('MINX', this.session);
    this.$state.go(this.isCustomer ? 'main.order' : '');
  }

  isProviderProfile () {
    if (this.isProvider && !this.getActiveObject(this.providers).length) {
      this.typeError = true;
      return false;
    }

    if (this.isProvider && !this.validate({images: this.images})) {
      return false;
    }

    if (this.isProvider) {
      this.session.user = _.assign(this.session.user, {
        displaying_name: this.displaying_name,
        service_types: this.getActiveObject(this.providers)
      });
    }

    return true;
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
  }

  getActiveObject (arr) {
    return _.filter(arr, object => object.active === true);
  }

}

export default ProfileCreateController;
