export default class profileFieldsController {

  constructor (User, Constants, Validation, Storage, $state, $q, Helper) {
    'ngInject';

    _.assign(this, {User, Constants, Validation, Storage, $state, $q, Helper, images: [], backupModel: {}, photosBuffer: []});

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

    this.images = this.Constants.profile.images[role];

    this.User.getUserProfile(
          Object.assign(this.session.user, 
                        {token: this.User.token()}),
          role, 
          false)
      .then((data) => {
        let photoSrc = '';

        if (data.photo) {
          photoSrc = data.photo.original;
          this.images[0] = {file: data.photo.preview};
        } else if (data.photos && data.photos.length > 0) {
          photoSrc = data.photos[0] && data.photos[0].original;
          _.each(data.photos, (photo, i) => {
            if (photo) {
              this.images[i] = {file: photo.preview};
            }
          })
        }

        this.backupPhotos();
        this.profilePhoto(photoSrc);

        return data;
      });
  }

  profilePhoto (photoSrc = '') {
    this.photo = {
      background: 'url(' + photoSrc + '?' + this.Helper.getUniqueNumberByTime() + ') no-repeat fixed center'     // add string to tell browser 
    };                                                                                              // to send request, instead of get image from cache

    this.backupModel.photo = angular.copy(this.photo);
  }

  backupPhotos (photos = this.images) {
    this.backupModel.images = [];
    _.each(photos, (photo, i) => {
      this.backupPhoto(photo, i);
    });
  }

  backupPhoto (photo, i) {
    this.backupModel.images[i] = {
      file: photo.file + '?' + this.Helper.getUniqueNumberByTime()
    }; 
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
      this[key] = angular.copy(model);
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

    this.UpdateUserProfile(profile)
      .then(() => {
        this.$state.go('main.profile.view');
      });
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
          result => {
            let photoResult = result.photo ? result.photo : result.photos[photo.slot - 1];

            if (photo.slot == 1) {
              this.profilePhoto(photoResult.original);
            }

            this.backupPhoto({file: photoResult.preview}, photo.slot - 1);

            return this.User.update({[this.isCustomer ? 'photo' : 'photos']: result.photo})
          },
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
    this.UpdateUserPhotos();
    return this.User
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