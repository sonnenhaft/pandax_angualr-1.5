class StatefulUserData {
  STORAGE_KEY = 'MINX_USER'
  _avatar = null

  constructor ($window, $injector) {
    'ngInject';

    Object.assign(this, { storage: $window.localStorage, $injector });
    let user = this.storage.getItem(this.STORAGE_KEY) || '{}';
    try {
      user = JSON.parse(user);
    } catch (e) {
      user = {};
    }
    this._setUser(user);
  }

  isAccepted ( ) {
    return !!this.storage.getItem('PANDA_RULES');
  }

  setIsAccepted (value) {
    if (value) {
      this.storage.setItem('PANDA_RULES', true);
    } else {
      this.storage.removeItem('PANDA_RULES');
    }
  }

  getAvatar ( ) { return this._avatar; }

  getBackground ( ) { return this._background; }

  getRole ( ) { return this.get('role'); }

  isProvider ( ) { return this.getRole( ) === 'provider'; }

  isCustomer ( ) { return this.getRole( ) === 'customer'; }

  isAdmin ( ) { return this.getRole( ) === 'admin'; }

  getUser ( ) { return this._user; }

  get (param) { return this._user[param]; }

  extend (user) {
    this._setUser(user);
    this._saveInStorage(this._user);
    return this._user;
  }

  _setUser (user) {
    this._user = Object.assign(this._user || {}, user || {});
    if (this._user.token) {
      // TODO(vlad): remove cycle dependency
      this.$injector.get('StatefulAuthTokenService').remember(this._user.token);
      delete this._user.token;
    }
    const photo = this.isCustomer( ) ? this._user.photo : (this._user.photos || [])[0];
    const { preview: avatar = '../assets/images/avatar.png', original: background = null } = photo || {};
    this._avatar = avatar;
    this._background = background;
    // this._avatar = `${avatar}?${Date.now( )}`;
    // this._background = `${background}?${Date.now( )}`;
  }

  _saveInStorage (user) {
    this.storage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  forget ( ) {
    this.storage.removeItem(this.STORAGE_KEY);
    this._user = {};
  }
}

export default angular.module('StatefulUserData', []).service('StatefulUserData', StatefulUserData).name;
