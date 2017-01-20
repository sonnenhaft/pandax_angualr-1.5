import DobInputComponent from './date-of-birth.input.component/date-of-birth.input.component';
import ImageInputComponent from './image-input.component/image-input.component';
import UserProfileResource from './user-profile.resource';

import CommonUserFieldsInput from '../../inputs/common-user-fields.input';
import PandaEmailInput from '../../inputs/panda-email.input';
import InputWrapperComponent from '../../inputs/input-wrapper.component';

import template from './profile.pages.html';

class controller {
  constructor ($q, $state, UserProfileResource, StatefulUserData, $stateParams, Cards) {
    'ngInject';

    Object.assign(this, { $q, StatefulUserData, UserProfileResource, $state, $stateParams, Cards });

    if (this.$state.current.name === 'createProfilePage') {
      this.isCreate = true;
      this.pageName = 'Create profile';
      this.submitButtonName = 'Ready';
    } else {
      this.isReadOnly = this.$state.current.name === 'viewProfilePage';
      this.pageName = this.isReadOnly ? 'Profile' : 'Edit profile';
      this.submitButtonName = 'Save';
    }

    this.newPaymentCard = {};
    const user = angular.copy(this.StatefulUserData.getUser( )) || {};

    const { displaying_name, first_name, last_name, phone, email, dob, photo, photos = [] } = user;
    this.userData = { displaying_name, first_name, last_name, phone, email, dob };
    if (!dob || !dob.year || !dob.day || !dob.month) {
      delete this.userData.dob; // we don't need null value
    }
    if (StatefulUserData.isCustomer( )) {
      this.images = [photo];
    } else {
      this.isProvider = true;
      this.images = ['', '', ''].map((item, idx) => (photos[idx] || {}));
    }
    const background = this.StatefulUserData.getBackground( );
    this.photoBackground = background && `url("${background}") no-repeat fixed center`;
  }

  submit (form) {
    form.$setSubmitted( );
    if (form.$pristine) {
      this.$state.go('viewProfilePage'); // TODO: make same for provider and DOB field
    } else if (form.$valid) {
      this.saveLoading = true;
      (( ) => {
        const images = this.images
          .map(({ original: file }, idx) => ({ file, idx: idx + 1 }))
          .filter(({ file }) => !angular.isString(file));
        if (!images.length) {
          return this.$q.when({});
        } else if (this.isProvider) {
          return this.$q.all(images.map(({ file, idx }) => this.UserProfileResource.uploadProviderPhotos({ idx }, file).$promise));
        } else {
          return this.UserProfileResource.uploadCustomerPhoto(images[0].file).$promise;
        }
      })( )
        .then(( ) => this.UserProfileResource.update({}, this.userData).$promise)
        .then(updatedUserDataIncludingImages => this.StatefulUserData.extend(updatedUserDataIncludingImages))
        .then(( ) => this.isCreate && this.Cards.add(this.newPaymentCard))
        .then(( ) => this.$state.go('viewProfilePage'))
        .catch(e => {
          this.saveLoading = false;

          // form.phone.$setValidity('phone_already_taken', false);
          // form.phone.setTouchedInvalid();

          console.log(e);
          throw new Error(e);
        });
    }
  }
}

export default angular.module('profileFields', [
  CommonUserFieldsInput,
  InputWrapperComponent,
  ImageInputComponent,
  DobInputComponent,
  PandaEmailInput,
  UserProfileResource
]).component('profileFields', {
  template,
  controller
}).config($stateProvider => {
  'ngInject';

  const parent = 'main.profile';
  const component = 'profilePages';
  $stateProvider
    .state({ name: parent, url: '/profile', abstract: true, parent: 'main', template: '<ui-view></ui-view>' })
    .state({ name: 'createProfilePage', url: '/create?stub', parent, component })
    .state({ name: 'viewProfilePage', url: '/view?stub', parent, component })
    .state({ name: 'editProfilePage', url: '/edit?stub', parent, component });
}).component('profilePages', {
  template,
  controller
}).name;

