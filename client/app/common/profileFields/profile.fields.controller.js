export default class profileFieldsController {

  constructor (User, Constants, Validation, Storage, $state) {
    'ngInject';

    _.assign(this, {User, Constants, Validation, Storage, $state});

    this.session = Storage.getObject('MINX');

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';
    this.fields = Constants.profile.fields[User.get('role')];
    this.images = this.Constants.profile.images[this.User.get('role')];

  }

  $onChanges (changes) {
    this.mode = changes.mode.currentValue;
  }

  $onInit () {
    switch (this.mode) {
      case 'profile.create':
        this.email = this.User.get('email');
        break;

      default:
        this.buildProfileModels();
        break;
    }
  }

  buildProfileModels () {
    this.mode = 'profile.view';

    _.mapValues(this.User.get(), (model, key) => {
      this[key] = model;
    });

    if (this.User.get('photo') && this.User.get('photo').$ngfBlobUrl) {
      this.photo = {
        background: 'url(' + this.User.get('photo').$ngfBlobUrl + ') no-repeat fixed center'
      };
    }
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

  onReady (profile) {
    if (!this.isProviderProfile() || !this.validate(profile)) {
      return false;
    }

    this.UpdateUserProfile(profile);
    this.$state.go('profile.view');
  }

  onSave (profile) {
    this.mode = 'profile.view';
    this.UpdateUserProfile(profile);
    this.buildProfileModels();
  }

  isProviderProfile () {
    if (this.isProvider && !this.validate({images: this.images})) {
      return false;
    }

    if (this.isProvider) {
      this.session.user = _.assign(this.session.user, {
        displaying_name: this.displaying_name
      });
    }

    return true;
  }

  UpdateUserProfile (profile) {
    this.User.update(
      _.assign(profile, {auth: true}, {
        photo: this.isCustomer ?
          _.head(this.images).file :
          _.map(this.images, 'file')
      })
    );

    this.User.UpdateUserProfile(profile);
  }

}
