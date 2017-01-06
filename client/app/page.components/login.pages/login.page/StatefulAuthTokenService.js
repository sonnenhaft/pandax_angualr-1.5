import StatefulUserData from '../../../common-services/StatefulUserData';

class StatefulAuthTokenService {
  STORAGE_KEY = 'MINX_TOKEN'

  constructor ($window, $timeout, StatefulUserData, $state) {
    'ngInject';

    Object.assign(this, { storage: $window.localStorage, $timeout, StatefulUserData, $state });
    this._token = this.storage.getItem(this.STORAGE_KEY);
  }

  getToken ( ) {
    return this._token;
  }

  remember (token) {
    this._token = token;
    this.storage.setItem(this.STORAGE_KEY, token);
  }

  forget ( ) {
    this.storage.removeItem(this.STORAGE_KEY);
  }

  /** alias for forget */
  logout ( ) {
    this.forget( );
    this.StatefulUserData.forget( );
    this.$timeout(( ) => this.$state.go('loginPage'), 1, false);    // waiting for finishing current state transition
  }
}

export default angular.module('StatefulAuthTokenService', [
  StatefulUserData
]).service('StatefulAuthTokenService', StatefulAuthTokenService).name;
