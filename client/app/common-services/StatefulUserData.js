class StatefulUserData {
  STORAGE_KEY = 'MINX_USER'
  _avatar = null

  constructor ($window) {
    'ngInject';

    Object.assign(this, { storage: $window.localStorage });
  }

  getAvatar ( ) { return this._avatar; }

  getRole ( ) { return this.get('role'); }

  isProvider ( ) { return this.getRole( ) === 'provider'; }

  isCustomer ( ) { return this.getRole( ) === 'customer'; }

  isAdmin ( ) { return this.getRole( ) === 'admin'; }

  restore ( ) {
    let user = this.storage.getItem(this.STORAGE_KEY) || '{}';
    try {
      user = JSON.parse(user);
    } catch (e) {
      user = {};
    }
    this._setUser(user);
  }

  getUser ( ) { return this._user; }

  get (param) { return this._user[param]; }

  extend (user) {
    this._setUser(user);
    this._saveInStorage(this._user);
  }

  _setUser (user) {
    this._user = Object.assign(this._user || {}, user || {});
    const photo = (this._user.photos || [this._user.photo])[0];
    if (photo && photo.preview) {
      this._avatar = `${photo.preview}?${Date.now( )}`;
    } else {
      this._avatar = '../assets/images/avatar.png';
    }
  }

  _saveInStorage (user) {
    this.storage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  forget ( ) {
    this.storage.removeItem(this.STORAGE_KEY);
    this._user = {};
  }
}

export default angular.module('StatefulUserData', [
]).service('StatefulUserData', StatefulUserData).name;
