import ngResource from 'angular-resource';

export default angular.module('LoginResource', [
  ngResource
]).factory('LoginResource', $resource => {
  'ngInject';

  return $resource('', {}, {
    login: { url: '{{config_api_url}}/api/sessions', method: 'POST' }, // {email, password}
    signup: { url: '{{config_api_url}}/api/signup/:userType', method: 'POST' }, // {email, password}
    restorePassword: { url: '{{config_api_url}}/api/sessions/password/reset', method: 'POST' }, // {email}
    resetPassword: { url: '{{config_api_url}}/api/sessions/password/:token', method: 'PUT' }, // {token}, {password}
    fetchProfile: { url: '{{config_api_url}}/api/:role/profile', method: 'GET' }
  }, { cancellable: true });
}).name;
