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

  isAuth ( ) { return this.Storage.getObject('MINX').user; }

  token ( ) { if (this.isAuth( )) { return this.Storage.getObject('MINX').token; } }

  get (param) { return param ? (this.Storage.getObject('MINX').user || {})[param] : this.Storage.getObject('MINX').user; }

  update (object) {
    const session = this.Storage.getObject('MINX');
    this.Storage.setObject('MINX', Object.assign(session, { user: Object.assign(session.user, object) }));
  }

  register (credentials) {
    return this.Request.send(false, this.Constants.api.signup.method, this.Constants.api.signup.uri(credentials.type), {
      email: credentials.email,
      password: credentials.password
    }).then(result => {
      if (result.data.detail) { return { error: result.data.detail }; }
      return this.login(credentials);
    });
  }

  login ({ email, password }) {
    return this.Request.send(false, 'POST', `${config.API_URL}/sessions`, { email, password }).then(result => {
      const errorMessage = result.data.message;
      const userToken = result.data.token;
      const user = result.data.data;
      if (errorMessage) { return { error: errorMessage }; } else {
        const role = user.role = user.role === 'client' ? 'customer' : user.role;
        this.Storage.setObject('MINX', { token: userToken, user: Object.assign(user, { auth: user.first_name && user.last_name }) });
        return this.getUserProfile(result.data, role);
      }
    });
  }

  restore (email) {
    return this.Request.send(false, this.Constants.api.password.restore.method, this.Constants.api.password.restore.uri, email).then(result => {
      if (result.data.detail) { return { error: result.data.detail }; }
      return result;
    });
  }

  reset (password, token) {
    return this.Request.send(false, this.Constants.api.password.change.method, this.Constants.api.password.change.uri(token), password).then(result => {
      if (result.data.detail) {
        return { error: result.data.detail };
      } else {
        return result;
      }
    });
  }

  changeByOld (passwordOld, passwordNew) {
    return this.Request.send(false, this.Constants.api.password.changeByOld.method, this.Constants.api.password.changeByOld.uri( ), {
      old_password: passwordOld,
      new_password: passwordNew
    }).then(result => {
      if (result.data.detail) { return { error: result.data.detail }; }
      return result;
    });
  }

  getUserProfile (user, type, redirectUser = true) {
    if (type == 'admin') {
      return this.$q.defer( ).resolve(user);
    } else {
      return this.Request.send(user.token, this.Constants.api.profile.method.GET, this.Constants.api.profile.uri(type)).then(result => {
        this.update(result.data);
        if (redirectUser) {
          this.redirectUser( );
        }
        this.setUserAvatarSrc(result.data);
        return result.data;
      }, error => error).then(data => data).finally(( ) => {
        if (redirectUser) {
          this.redirectUser( );
        }
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

  redirectUser ( ) {
    switch (true) {
      case this.get('role') === 'customer':
        this.$state.go('main.order');
        return false;
      case this.get('role') === 'admin':
        this.$state.go('admin.entertainers');
        return false;
      case !this.get('first_name') || !this.get('last_name'):
        this.$state.go('main.profile.create');
        return false;
      default:
        this.$state.go('main.profile.view');
    }
  }

  logout ( ) {
    this.Storage.remove('MINX');
    setTimeout(( ) => this.$state.go('loginPage'), 1);    // 'setTimeout' - waiting for finishing current state transition
  }

  /* User avatar section */
  fetchUserAvatarSrc ( ) {
    return this.getUserAvatarSrc( ) || this.getUserProfile(Object.assign(this.get( ), { token: this.token( ) }), this.get('role'), false)
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

  getUserAvatarSrc ( ) { return this.userAvatarSrc; }

  fetchBillingInfo ( ) { return this.billingInfo; }

  getActualStatus ( ) {
    return this.Request.send(null, this.Constants.api.actualStatusOfCurrentUser.method, this.Constants.api.actualStatusOfCurrentUser.uri).then(result => {
      this.update(result.data);
      return result.data && result.data.status;
    });
  }
}
export default angular.module('user', [Storage, Constants, Request]).service('User', User).name;
