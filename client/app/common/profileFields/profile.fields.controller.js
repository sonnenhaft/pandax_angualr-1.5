export default class profileFieldsController {

  constructor (User, Constants, Validation, Storage, $state) {
    'ngInject';

    _.assign(this, {User, Constants, Validation, Storage, $state});

    this.session = Storage.getObject('MINX');

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';
    this.fields = Constants.profile.fields[User.get('role')];
    this.images = this.profileImage();

  }

  $onChanges (changes) {
    this.mode = changes.mode.currentValue;
  }

  $onInit () {
    switch (this.mode) {
      case 'main.profile.create':
        this.email = this.User.get('email');
        break;

      default:
        this.buildProfileModels();
        break;
    }
  }

  profileImage () {
    if (!this.User.get('photo')) {
      return this.Constants.profile.images[this.User.get('role')];
    }

    return this.isCustomer ?
      [{file: this.User.get('photo').preview}] :
      _.map(this.User.get('photos'), image => {
        return {
          file: image.preview
        }
      })
  }

  buildProfileModels () {
    this.mode = 'main.profile.view';

    _.mapValues(this.User.get(), (model, key) => {
      this[key] = model;
    });

    if (this.User.get('photo')) {
      this.photo = {
        background: 'url(' + this.User.get('photo').original + ') no-repeat fixed center'
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
    this.$state.go('main.profile.view');
  }

  onSave (profile) {
    if (this.validate(profile)) {
      this.UpdateUserProfile(profile, 'main.profile.view');
    }
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

  onImageChange (image, slot) {
    this.User
      .UpdateUserPhoto(image, slot)
      .then(
        result => this.User.update({[this.isCustomer ? 'photo' : 'photos']: result.photo}),
        error => console.log(error)
      );
  }

  UpdateUserProfile (profile, mode) {
    this.saveLoading = true;
    this.User
      .UpdateUserProfile(profile)
      .then(
        result => {
          this.saveLoading = false;
          this.User.update(_.assign(result, {auth: true}));
          this.mode = mode;
          this.buildProfileModels();
        },
        error => {
          this.saveLoading = false;
          console.log(error);
        }
      );
  }

}
