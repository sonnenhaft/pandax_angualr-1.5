export default class profileFieldsController {

  constructor (User, Constants, Validation, Storage, $state, $timeout) {
    'ngInject';

    _.assign(this, {User, Constants, Validation, Storage, $state, $timeout});

    this.session = Storage.getObject('MINX');

    this.isCustomer = User.get('type') === 'customer';
    this.isProvider = User.get('type') === 'provider';
    this.fields = Constants.profile.fields[User.get('type')];
    this.images = this.Constants.profile.images[this.User.get('type')];

  }

  $onChanges (changes) {
    this.onModeChange(changes.mode.currentValue);
  }

  $onInit () {
    if (this.mode !== 'profile.create') {
      this.buildProfileModels();
    }
  }

  buildProfileModels () {
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

  onModeChange (mode) {
    this.mode = mode;

    switch (mode) {

      case 'profile.view':
        this.buttonName = 'Edit profile';
        break;

      case 'profile.edit':
        this.buttonName = 'Save';
        break;

      case 'profile.create':
        this.email = this.User.get('email');
        this.buttonName = 'Ready';
        break;

      default:

    }
  }

  onEditCancel () {
    this.onModeChange('profile.view');
    this.buildProfileModels();
  }

  onSubmit (profile) {
    if (this.mode === 'profile.view') {
      this.onModeChange('profile.edit');
      return false;
    }

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
        photo: this.isCustomer ?
          _.head(this.images).file :
          _.map(this.images, 'file')
      }
    );

    //console.log(this.session.user);

    this.Storage.setObject('MINX', this.session);

    if (this.mode === 'profile.edit') {
      this.onModeChange('profile.view');
      this.buildProfileModels();
      return false;
    }

    if (this.mode === 'profile.create') {
      this.$state.go(this.isCustomer ? 'main.order' : 'main.order');
      return false;
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

}
