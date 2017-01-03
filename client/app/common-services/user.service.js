import config from 'config';

import Storage from './storage.service';
import Request from './request.service';

class User {
  constructor (Storage, Request, $state, $http, Helper, $q, $mdDialog) {
    'ngInject';

    Object.assign(this, { Storage, Request, $state, $http, Helper, $q, $mdDialog, userAvatarSrc: '', billingInfo: {} });
  }

  get (param) { return param ? (this.Storage.getObject('MINX').user || {})[param] : this.Storage.getObject('MINX').user; }

  update (user) {
    const MINX = this.Storage.getObject('MINX');
    MINX.user = Object.assign(MINX.user, user);
    this.Storage.setObject('MINX', MINX);
  }

  changeByOld (old_password, new_password) { // eslint-disable-line camelcase
    return this.Request.post(`${config.API_URL}/api/password/change`, {
      old_password, // eslint-disable-line camelcase
      new_password // eslint-disable-line camelcase
    }).then(result => {
      if (result.data.detail) {
        return { error: result.data.detail };
      } else {
        return result;
      }
    });
  }

  getUserProfile (user, type) {
    const url = `${config.API_URL}/api/${type}/profile`;
    return type === 'admin' ? this.$q.when(user) : this.Request.get(url).then(result => {
      this.update(result.data);
      this.setUserAvatarSrc(result.data);
      return Object.assign({}, user, result.data);
    });
  }

  UpdateUserProfile (data) {
    return this.Request.put(`${config.API_URL}/api/${this.get('role')}/profile`, data).then(result => {
      this.update(result.data);
      return result.data;
    });
  }

  UpdateUserPhoto (file, slot) {
    const url = `${config.API_URL}/api/${this.get('role')}/profile/photo${this.get('role') === 'provider' ? `/${slot}` : ''}`;
    return this.Request.put(url, file).then(result => {
      if (slot == 1) { this.setUserAvatarSrc(result.data); }
      return result.data;
    });
  }

  /* User avatar section */
  fetchUserAvatarSrc ( ) {
    return this.userAvatarSrc || this.getUserProfile(this.get( ), this.get('role'), false)
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
    return this.Request.get(`${config.API_URL}/api/status`).then(result => {
      this.update(result.data);
      return result.data && result.data.status;
    });
  }
}
export default angular.module('user', [
  Storage,
  Request
]).service('User', User).name;
