export default class profileFieldsController {

  constructor (User, Constants, Validation, Storage, $state, $q) {
    'ngInject';

    _.assign(this, {User, Constants, Validation, Storage, $state, images: [], backupModel: {}, photosBuffer: [], $q});

    this.session = Storage.getObject('MINX');

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';
    this.fields = Constants.profile.fields[User.get('role')];
    this.profileImage();

  }

  $onChanges (changes) {
    this.mode = changes.mode.currentValue;
  }

  $onInit () {
    switch (this.mode) {
      case 'main.profile.create':
        this.email = this.User.get('email');
        this.backupModel.email = this.email;
        break;

      default:
        this.buildProfileModels();
        break;
    }
  }

  profileImage () {
    let role = this.User.get('role');

    this.User.getUserProfile(
          Object.assign(this.session.user, 
                        {token: this.User.token()}),
          role, 
          false)
      .then((data) => {
        if (data.photo) {
          this.images.push({file: data.photo.preview});
        } else if (data.photos && data.photos.length) {
          _.each(data.photos, (photo) => {
            this.images.push({file: photo.preview});
          })
        } else {
          this.images = this.Constants.profile.images[role];
        }
      })
      .then(() => {
        this.backupModel.photo = angular.copy(this.images[0]);
        this.backupModel.images = angular.copy(this.images);
      });

    this.photo = this.images[0];
  }

  buildProfileModels () {
    this.mode = 'main.profile.view';

    _.mapValues(this.User.get(), (model, key) => {
      this[key] = model;
      this.backupModel[key] = angular.copy(model);
    });
  }

  rebuildProfileModelsFromBackup () {
    this.mode = 'main.profile.view';

    _.mapValues(this.backupModel, (model, key) => {
      this[key] = model;
    });
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

    profile = _.assign(profile, {                             // maybe, should be replace with better logic
      displaying_name: this.displaying_name                   //
    });                                                       //

    this.UpdateUserProfile(profile);
    this.$state.go('main.profile.view');
  }

  onSave (profile) {
    if (this.validate(profile)) {
      profile = _.assign(profile, {                             // maybe, should be replace with better logic
        displaying_name: this.displaying_name                   //
      });                                                       //
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
    if (image) {
      this.photosBuffer.push({image: image, slot: slot});
    }
  }

  UpdateUserPhotos () {
    if (this.photosBuffer.length == 0) {
      return false;
    }

    let promises = [];

    _.each(this.photosBuffer, (photo) => {
      let query = this.User
        .UpdateUserPhoto(photo.image, photo.slot)
        .then(
          result => this.User.update({[this.isCustomer ? 'photo' : 'photos']: result.photo}),
          error => console.log(error)
        );
      promises.push(query);
    })

    this.$q.all(promises).then((data) => {
      this.photosBuffer = [];
    })
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
    this.UpdateUserPhotos();
  }

}
