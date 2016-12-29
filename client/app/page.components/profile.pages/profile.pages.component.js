import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';

import Validation from '../../common-services/validation.service';
import Storage from '../../common-services/storage.service';
import User from '../../common-services/user.service';

import template from './profile.pages.html';

const CUSTOMER_FIELDS = [
  {
    combined: [
      { name: 'First Name', model: 'first_name', type: 'text' },
      { name: 'Last Name', model: 'last_name', type: 'text', desc: 'We won\'t display your last name' }
    ]
  },
  { name: 'Phone Number', model: 'phone', type: 'tel' },
  { type: 'dob' },
  { name: 'Email', model: 'email', type: 'email' }
];

class controller {
  constructor (User, Validation, Storage, $state, $q, Helper, Cards) {
    'ngInject';

    Object.assign(this, { User, Validation, Storage, $state, $q, Helper, Cards });

    this.isCreate = this.$state.current.name === 'main.profile.create';
    this.isEdit = this.$state.current.name === 'main.profile.edit';
    this.isEditable = this.isCreate || this.isEdit;

    this.images = [];
    this.backupModel = {};
    this.photosBuffer = [];
    if (this.isCreate) {
      this.email = this.User.get('email');
      this.backupModel.email = this.email;
      this.newCard = {};
    } else {
      this._buildProfileModels( );
    }

    const role = User.get('role');
    if (role === 'customer') {
      this.fields = CUSTOMER_FIELDS;
      this.images = [{ file: '' }];
    } else if (role === 'provider') {
      this.images = [{ file: '' }, { file: '' }, { file: '' }];
      this.isProvider = true;
      this.fields = CUSTOMER_FIELDS.slice( );
      this.fields.unshift({ name: 'Display Name', model: 'displaying_name', type: 'text' });
    }

    this.User.getUserProfile(Object.assign(Storage.getObject('MINX').user, { token: this.User.token( ) }), role, false).then(data => {
      const serverPhotos = data.photo ? [data.photo] : data.photos;
      if (!serverPhotos.length || !serverPhotos[0]) {
        serverPhotos[0] = {};
      }
      this.backupModel.images = [];
      serverPhotos.forEach((photo, i) => {
        if (!photo) { return; }
        this.images[i] = { file: photo.preview };
        this._backupPhoto(photo, i);
      });

      this._profilePhoto(serverPhotos[0].original);
    });
  }

  // add string to tell browser
  // to send request, instead of get image from cache
  _profilePhoto (photoSrc = '') {
    this.photo = {
      background: `url(${photoSrc}?${this.Helper.getUniqueNumberByTime( )}) no-repeat fixed center`
    };

    this.backupModel.photo = angular.copy(this.photo);
  }

  _backupPhoto (photo, i) {
    this.backupModel.images[i] = {
      file: `${photo.file}?${this.Helper.getUniqueNumberByTime( )}`
    };
  }

  _buildProfileModels ( ) {
    const user = this.User.get( );
    Object.assign(this, user);
    Object.assign(this.backupModel, angular.copy(user));
  }

  validate (profileFields) {
    const errors = this.Validation.error(profileFields);
    if (errors.length) {
      errors.forEach(error => this[`${error.name}Error`] = error.text);
      return false;
    } else {
      return true;
    }
  }

  createProfile (profileForm) {
    this._onReady(profileForm, true);
  }

  updateProfile (form) {
    this._onReady(form);
  }

  _onReady (profileForm, addCard = false) {
    const profile = {
      first_name: profileForm.first_name.$viewValue,
      last_name: profileForm.last_name.$viewValue,
      phone: profileForm.phone.$viewValue,
      email: profileForm.email.$viewValue,
      dob: profileForm.dob.$viewValue
    };

    if (this.isProvider) {
      Object.assign(profile, {
        displaying_name: profileForm.displaying_name.$viewValue,
        images: this.images
      });
    }

    // show error messages if all validations messages should be shown at one moment
    profileForm.$setSubmitted( );
    if (!this.validate(profile) || profileForm.$invalid) {
      return false;
    }
    this.saveLoading = true;
    this.$q.all(this.photosBuffer.map(photo => this.User.UpdateUserPhoto(photo.image, photo.slot).then(uploadedPhoto => {
      const photoResult = uploadedPhoto.photo ? uploadedPhoto.photo : uploadedPhoto.photos[photo.slot - 1];

      if (photoResult) {
        this._backupPhoto({ file: photoResult.preview }, photo.slot - 1);
        if (photo.slot == 1) {
          this._profilePhoto(photoResult.original);
        }
      }

      const updateKey = !this.isProvider ? 'photo' : 'photos';
      return this.User.update({ [updateKey]: uploadedPhoto[updateKey] });
    }
    )))
      .then(( ) => {
        profile[(!this.isProvider ? 'image' : 'images')] = this.User.get(!this.isProvider ? 'photo' : 'photos');
        return this.User.UpdateUserProfile(profile);
      })
      .then(result => {
        this.User.update(Object.assign(result, { auth: true }));
        this.photosBuffer = [];
        this._buildProfileModels( );
        if (addCard) {
          return this.Cards.add(this.newCard);
        }
      })
      .then(( ) => this.$state.go('main.profile.view'))
      .finally(( ) => this.saveLoading = false);
  }

  onImageChange (image, slot) {
    if (!image) { return; }
    const item = this.photosBuffer.find(item => item.slot === slot);
    if (item) {
      this.photosBuffer[this.photosBuffer.indexOf(item)] = { image, slot };
    } else {
      this.photosBuffer.push({ image, slot });
    }
  }
}

export default angular.module('profileFields', [
  uiRouter,
  ngFileUpload,
  Validation,
  Storage,
  User
]).component('profileFields', {
  template,
  controller
}).filter('customDate', ( ) => dateLikeObject => {
  if (dateLikeObject) {
    return new Date(`${dateLikeObject.month}/${dateLikeObject.day}/${dateLikeObject.year}`);
  } else {
    return dateLikeObject;
  }
}).config($stateProvider => {
  'ngInject';

  const parent = 'main.profile';
  const component = 'profileFields';
  $stateProvider
    .state({ name: parent, url: '/profile', abstract: true, parent: 'main', template: '<ui-view></ui-view>' })
    .state({ name: 'main.profile.create', url: '/create', parent, component })
    .state({ name: 'main.profile.view', url: '/view', parent, component })
    .state({ name: 'main.profile.edit', url: '/edit', parent, component });
}).name;
