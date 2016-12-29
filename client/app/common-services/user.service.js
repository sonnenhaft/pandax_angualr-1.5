import angular from 'angular';
import config from 'config';

import Storage from './storage.service';
import Constants from './constants.service';
import Request from './request.service';

class User {
  constructor (Storage, Constants, Request, $state, $http, Helper, $q, $mdDialog) {
    'ngInject';

    Object.assign(this, { Storage, Constants, Request, $state, $http, Helper, $q, $mdDialog, userAvatarSrc: '', billingInfo: {} });
  }

  token ( ) { return this.Storage.getObject('MINX').token; }

  get (param) { return param ? (this.Storage.getObject('MINX').user || {})[param] : this.Storage.getObject('MINX').user; }

  update (object) {
    const session = this.Storage.getObject('MINX');
    this.Storage.setObject('MINX', Object.assign(session, { user: Object.assign(session.user, object) }));
  }

  changeByOld (old_password, new_password) { // eslint-disable-line camelcase
    return this.Request.send(false, this.Constants.api.password.changeByOld.method, this.Constants.api.password.changeByOld.uri( ), {
      old_password, // eslint-disable-line camelcase
      new_password // eslint-disable-line camelcase
    }).then(result => {
      if (result.data.detail) { return { error: result.data.detail }; }
      return result;
    });
  }

  getUserProfile (user, type) {
    if (type === 'admin') {
      return this.$q.when(user);
    } else {
      return this.Request.send(this.token( ), 'GET', `${config.API_URL}/api/${type}/profile`).then(result => {
        this.update(result.data);
        this.setUserAvatarSrc(result.data);
        return Object.assign({}, user, result.data);
      });
    }
  }

  UpdateUserProfile (data) {
    return this.Request.send(this.token( ), this.Constants.api.profile.method.PUT, this.Constants.api.profile.uri(this.get('role')), data).then(result => {
      this.update(result.data);
      return result.data;
    });
  }

  UpdateUserPhoto (file, slot) {
    return this.Request.send(this.token( ), this.Constants.api.photo.method, this.Constants.api.photo.uri(this.get('role'), slot), file).then(result => {
      if (slot == 1) { this.setUserAvatarSrc(result.data); }
      return result.data;
    });
  }

  logout ( ) {
    this.Storage.remove('MINX');
    setTimeout(( ) => this.$state.go('loginPage'), 1);    // 'setTimeout' - waiting for finishing current state transition
  }

  /* User avatar section */
  fetchUserAvatarSrc ( ) {
    return this.userAvatarSrc || this.getUserProfile(Object.assign(this.get( ), { token: this.token( ) }), this.get('role'), false)
        .then(data => this.setUserAvatarSrc(data));
  }

  setUserAvatarSrc (data = {}) {
    let photoSrc = '../assets/images/avatar.png';
    if (data.photo && data.photo.preview) {
      photoSrc = data.photo.preview;
    } else if (data.photos && data.photos[0] && data.photos[0].preview) {
      photoSrc = data.photos[0].preview;
    }
    if (!photoSrc || photoSrc.length == 0) {
      photoSrc = '../assets/images/avatar.png';
    }
    return this.userAvatarSrc = `${photoSrc}?${this.Helper.getUniqueNumberByTime( )}`;
  }

  getActualStatus ( ) {
    return this.Request.send(null, 'GET', `${config.API_URL}/api/status`).then(result => {
      this.update(result.data);
      return result.data && result.data.status;
    });
  }
}
export default angular.module('user', [
  Storage, Constants, Request
]).service('User', User).name;
