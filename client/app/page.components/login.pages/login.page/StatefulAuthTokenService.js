import StatefulUserData from '../../../common-services/StatefulUserData';

class StatefulAuthTokenService {
  STORAGE_KEY = 'MINX_TOKEN'

  constructor ($window, $http, $timeout, StatefulUserData, $state) {
    'ngInject';

    Object.assign(this, { storage: $window.localStorage, $http, $timeout, StatefulUserData, $state });
  }

  restore ( ) {
    const token = this.storage.getItem(this.STORAGE_KEY);
    if (token) {
      this._setAuthTokenToHttpCommonHeaders(token);
    }
  }

  _setAuthTokenToHttpCommonHeaders (token) {
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  remember (token) {
    this.storage.setItem(this.STORAGE_KEY, token);
    this._setAuthTokenToHttpCommonHeaders(token);
  }

  forget ( ) {
    this.storage.removeItem(this.STORAGE_KEY);
    delete this.$http.defaults.headers.common.Authorization;
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
