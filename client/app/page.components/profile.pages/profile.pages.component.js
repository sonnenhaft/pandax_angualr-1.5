import ngFileUpload from 'ng-file-upload';

import Validation from '../../common-services/validation.service';

import template from './profile.pages.html';
import DobInputComponent from './date-of-birth.input.component/date-of-birth.input.component';

import UserProfileResource from './user-profile.resource';

class controller {
  static PROVIDER_FIELDS = [
    { name: 'Display Name', model: 'displaying_name', type: 'text' },
    {
      combined: [
        { name: 'First Name', model: 'first_name', type: 'text' },
        { name: 'Last Name', model: 'last_name', type: 'text', desc: 'We won\'t display your last name' }
      ]
    },
    { name: 'Phone Number', model: 'phone', type: 'tel' },
    { type: 'dob' },
    { name: 'Email', model: 'email', type: 'email' }
  ]

  static CUSTOMER_FIELDS = [
    {
      combined: [
        { name: 'First Name', model: 'first_name', type: 'text' },
        { name: 'Last Name', model: 'last_name', type: 'text', desc: 'We won\'t display your last name' }
      ]
    },
    { name: 'Phone Number', model: 'phone', type: 'tel' },
    { name: 'Email', model: 'email', type: 'email' }
  ]

  constructor (Validation, $state, $q, Helper, Cards, StatefulUserData, UserProfileResource) {
    'ngInject';

    Object.assign(this, { Validation, $state, $q, Helper, Cards, StatefulUserData, UserProfileResource });

    this.isCreate = this.$state.current.name === 'main.profile.create';
    this.isEdit = this.$state.current.name === 'main.profile.edit';
    this.isEditable = this.isCreate || this.isEdit;

    this.images = [];
    this.backupModel = {};
    this.photosBuffer = [];
    if (this.isCreate) {
      this.email = this.StatefulUserData.get('email');
      this.backupModel.email = this.email;
      this.newCard = {};
    } else {
      this._buildProfileModels( );
    }

    if (StatefulUserData.isCustomer( )) {
      this.fields = controller.CUSTOMER_FIELDS;
      this.images = [{ file: '' }];
    } else if (StatefulUserData.isProvider( )) {
      this.images = [{ file: '' }, { file: '' }, { file: '' }];
      this.isProvider = true;
      this.fields = controller.PROVIDER_FIELDS;
    }

    const user = this.StatefulUserData.getUser( );
    const serverPhotos = user.photo ? [user.photo] : (user.photos || []);
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
  }

  // add string to tell browser
  // to send request, instead of get image from cache
  _profilePhoto (photoSrc = '') {
    this.photo = {
      background: `url(${photoSrc}?${Date.now( )}) no-repeat fixed center`
    };

    this.backupModel.photo = angular.copy(this.photo);
  }

  _backupPhoto ({ file }, i) {
    this.backupModel.images[i] = {
      file: `${file}?${Date.now( )}`
    };
  }

  _buildProfileModels ( ) {
    const user = this.StatefulUserData.getUser( );
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
      email: profileForm.email.$viewValue
    };

    if (this.isProvider) {
      Object.assign(profile, {
        dob: profileForm.dob.$viewValue,
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

    const UploadPhoto = (file, slot_id) => { // eslint-disable-line camelcase
      if (this.StatefulUserData.isProvider( )) {
        return this.UserProfileResource.uploadPhoto({ slot_id }, file).$promise.then(newUser => { // eslint-disable-line camelcase
          if (slot_id === 1) { // eslint-disable-line camelcase
            this.StatefulUserData.extend(newUser);
          }
          return newUser;
        });
      } else {
        return this.UserProfileResource.uploadSinglePhoto(file).$promise;
      }
    };

    this.$q.all(this.photosBuffer.map(photo => UploadPhoto(photo.image, photo.slot).then(uploadedPhoto => {
      const photoResult = uploadedPhoto.photo ? uploadedPhoto.photo : uploadedPhoto.photos[photo.slot - 1];

      if (photoResult) {
        this._backupPhoto({ file: photoResult.preview }, photo.slot - 1);
        if (photo.slot === 1) {
          this._profilePhoto(photoResult.original);
        }
      }

      const updateKey = this.isProvider ? 'photos' : 'photo';
      return this.StatefulUserData.extend({ [updateKey]: uploadedPhoto[updateKey] });
    }
    )))
      .then(( ) => {
        profile[(!this.isProvider ? 'image' : 'images')] = this.StatefulUserData.get(this.isProvider ? 'photos' : 'photo');
        return this.UserProfileResource.update({}, profile);
      })
      .then(({ data: user }) => {
        this.StatefulUserData.extend(user);
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
    console.log('x');
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
  DobInputComponent,
  UserProfileResource,
  ngFileUpload,
  Validation
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
