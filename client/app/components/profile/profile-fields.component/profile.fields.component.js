import angular from 'angular';
import uiRouter from 'angular-ui-router';
import User from '../../../services/user.service';
import Constants from '../../../services/constants.service';
import Validation from '../../../services/validation/validation';
import Storage from '../../../services/storage/storage';
import ngFileUpload from 'ng-file-upload';

import template from './profile.fields.html';

class controller {
  constructor(User, Constants, Validation, Storage, $state, $q, $timeout, Helper, Cards) {
    'ngInject';

    _.assign(this, { User, Constants, Validation, Storage, $state, $q, $timeout, Helper, Cards, images: [], backupModel: {}, photosBuffer: [] });

    this.session = Storage.getObject('MINX');

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';
    this.fields = Constants.profile.fields[User.get('role')];
    this.profileImage();
  }

  $onChanges(changes) {
    this.$timeout(() => {
      this.mode = changes.mode.currentValue;
    });
  }

  $onInit() {
    switch ( this.mode ) {
      case 'main.profile.create':
        this.email = this.User.get('email');
        this.backupModel.email = this.email;
        this.newCard = {};
        break;

      default:
        this.buildProfileModels();
        break;
    }
  }

  profileImage() {
    let role = this.User.get('role');

    this.images = this.Constants.profile.images[role];

    this.User.getUserProfile(
      Object.assign(this.session.user,
        { token: this.User.token() }),
      role,
      false)
      .then((data) => {
        let photoSrc = '';

        if (data.photo) {
          photoSrc = data.photo.original;
          this.images[0] = { file: data.photo.preview };
        } else if (data.photos && data.photos.length > 0) {
          photoSrc = data.photos[0] && data.photos[0].original;
          _.each(data.photos, (photo, i) => {
            if (photo) {
              this.images[i] = { file: photo.preview };
            }
          })
        }

        this.backupPhotos();
        this.profilePhoto(photoSrc);

        return data;
      });
  }

  profilePhoto(photoSrc = '') {
    this.photo = {
      background: 'url(' + photoSrc + '?' + this.Helper.getUniqueNumberByTime() + ') no-repeat fixed center'     // add string to tell browser
    };                                                                                              // to send request, instead of get image from cache

    this.backupModel.photo = angular.copy(this.photo);
  }

  backupPhotos(photos = this.images) {
    this.backupModel.images = [];
    _.each(photos, (photo, i) => {
      this.backupPhoto(photo, i);
    });
  }

  backupPhoto(photo, i) {
    this.backupModel.images[i] = {
      file: photo.file + '?' + this.Helper.getUniqueNumberByTime()
    };
  }

  buildProfileModels() {
    this.mode = 'main.profile.view';

    _.mapValues(this.User.get(), (model, key) => {
      this[key] = model;
      this.backupModel[key] = angular.copy(model);
    });
  }

  rebuildProfileModelsFromBackup() {
    this.mode = 'main.profile.view';

    _.mapValues(this.backupModel, (model, key) => {
      this[key] = angular.copy(model);
    });

    this.newCard = {};
  }

  validate(field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
  }

  onReady(profile, form) {
    profile = this.addAbsentFields(profile);
    form.$setSubmitted();                                         // show error messages if

    if (!this.validate(profile) || form.$invalid) {               // all validations messages should be shown at one moment
      return false;
    }

    this.saveLoading = true;

    this.addCard()
      .then(
        data => {
          this.UpdateUserProfile(profile)
            .then(
              _data => {
                this.saveLoading = false;
                this.$state.go('main.profile.view');
              });
        },
        error => {
          this.saveLoading = false;
        });
  }

  onSave(profile) {
    profile = this.addAbsentFields(profile);

    if (this.validate(profile)) {
      this.saveLoading = true;
      this.UpdateUserProfile(profile, 'main.profile.view')
        .finally((_data) => {
          this.saveLoading = false;
        });
    }
  }

  onImageChange(image, slot) {
    if (image) {
      let indexFounded = _.findIndex(this.photosBuffer, { slot: slot });
      if (indexFounded >= 0) {
        this.photosBuffer[indexFounded] = { image: image, slot: slot };
      } else {
        this.photosBuffer.push({ image: image, slot: slot });
      }
    }
  }

  UpdateUserPhotos() {
    let promises = [];

    _.each(this.photosBuffer, (photo) => {
      let query = this.User
        .UpdateUserPhoto(photo.image, photo.slot)
        .then(
          result => {
            let photoResult = result.photo ? result.photo : result.photos[photo.slot - 1];

            if (photoResult) {
              this.backupPhoto({ file: photoResult.preview }, photo.slot - 1);
              if (photo.slot == 1) {
                this.profilePhoto(photoResult.original);
              }
            }

            return this.User.update({ [this.isCustomer ? 'photo' : 'photos']: result.photo });
          }
        );
      promises.push(query);
    });

    return this.$q.all(promises).then((data) => {
      this.photosBuffer = [];
    });
  }

  UpdateUserProfile(profile, mode) {
    let queryToUpdatePersonalInfo = this.User
      .UpdateUserProfile(profile)
      .then(
        result => {
          this.User.update(_.assign(result, { auth: true }));
        }
      );

    return this.$q.all([this.UpdateUserPhotos(), queryToUpdatePersonalInfo])
      .then((data) => {
        this.mode = mode;
        this.buildProfileModels();
        return data;
      });
  }

  addAbsentFields(profile) {
    if (this.displaying_name) {
      profile = _.assign(profile, {                             // maybe, should be replace with better logic
        displaying_name: this.displaying_name,                   //
        images: this.images
      });
    }

    return profile;
  }

  addCard(card = this.newCard) {
    return this.Cards
      .add(card)
      .then(result => result);
  }
}

export default angular.module('profileFields', [
  uiRouter,
  User,
  Constants,
  Validation,
  Storage,
  ngFileUpload
]).component('profileFields', {
  bindings: {
    mode: '<',
    output: '&'
  },
  template,
  controller
}).name;
