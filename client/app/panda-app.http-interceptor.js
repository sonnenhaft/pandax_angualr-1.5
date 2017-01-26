import config from 'config';
import StatefulUserData from './common-services/StatefulUserData';

class PandaHttpInterceptor {
  static API_PREFIX = '{{config_api_url}}'
  static ROLE_SUFFIX = '{{current_user_role}}'
  static API_URL = config.API_URL

  constructor ($q, $injector, StatefulUserData, StatefulAuthTokenService) {
    'ngInject';

    Object.assign(this, { $q, $injector, StatefulUserData, StatefulAuthTokenService });
  }

  request = config => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';

    if (config.url.indexOf(PandaHttpInterceptor.API_PREFIX) !== -1) {
      config.url = config.url.replace(PandaHttpInterceptor.ROLE_SUFFIX, this.StatefulUserData.getRole( ));
      config.url = config.url.replace(PandaHttpInterceptor.API_PREFIX, PandaHttpInterceptor.API_URL);
      const token = this.StatefulAuthTokenService.getToken( );
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.data) {
        if (config.data.type) {
          config.headers['Content-Type'] = config.data.type;
        } else {
          config.data = JSON.stringify(config.data);
        }
      }
    }
    return config;
  }

  responseError = response => {
    console.log('api error happened');
    const Helper = this.$injector.get('Helper');
    if (response.status === -1 || response.status === 502 && !response.statusText) {
      response.statusText = 'Not able to connect to remote server';
      response.data = response.data || { message: response.statusText };
      Helper.showToast(response.statusText, 5000);
    }
    if (response.detail) {
      response.statusText = response.detail;
    }
    if (response.status >= 400 && response.status != 403) { // for 403 status we have another handler only in userService.login()
      let messageText = response.statusText;
      if (response.data) {
        messageText = response.data.detail || response.data.message;
      }
      if (messageText !== 'PHONE_ALREADY_EXIST') {
        Helper.showToast(messageText, 5000);
      }
      if (response.status == 401) {
        this.StatefulAuthTokenService.logout( );
      }
    } else if (response.status == 403) {
      Helper.showBanPopUp(response.data && response.data.detail);
      this.StatefulAuthTokenService.logout( );
    }

    return this.$q.reject(response);
  }
}

export default angular.module('PandaHttpInterceptor', [
  StatefulUserData
]).service('PandaHttpInterceptor', PandaHttpInterceptor).name;
