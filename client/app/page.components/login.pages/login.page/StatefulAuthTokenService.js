class StatefulAuthTokenService {
  static STORAGE_KEY = 'MINX_TOKEN'

  constructor ($window, $http, $timeout) {
    'ngInject';

    Object.assign(this, { storage: $window.localStorage, $http, $timeout });
  }

  restore ( ) {
    const token = this.storage.getItem(StatefulAuthTokenService.STORAGE_KEY);
    if (token) {
      this.remember(token);
    }
  }

  remember (token) {
    this.storage.setItem(StatefulAuthTokenService.STORAGE_KEY, token);
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  forget ( ) {
    this.storage.removeItem(StatefulAuthTokenService.STORAGE_KEY);
    delete this.$http.defaults.headers.common.Authorization;
  }

  /** alias for forget */
  logout ( ) {
    this.forget( );
    this.storage.remove('MINX'); // TODO: make cleaning of the user data more transparent
    this.$timeout(( ) => this.$state.go('loginPage'), 1, false);    // waiting for finishing current state transition
  }
}

export default angular.module('StatefulAuthTokenService', []).service('StatefulAuthTokenService', StatefulAuthTokenService).name;
