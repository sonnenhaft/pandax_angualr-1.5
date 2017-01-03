import config from 'config';
import ngResource from 'angular-resource';

export default angular.module('LoginResource', [
  ngResource
]).factory('LoginResource', $resource => {
  'ngInject';

  return $resource('', {}, {
    login: { url: `${config.API_URL}/api/sessions`, method: 'POST' }, // {email, password}
    signup: { url: `${config.API_URL}/api/signup/:userType`, method: 'POST' }, // {email, password}
    restorePassword: { url: `${config.API_URL}/api/sessions/password/reset`, method: 'POST' }, // {email}
    resetPassword: { url: `${config.API_URL}/api/sessions/password/:token`, method: 'PUT' } // {token}, {password}
  }, { cancellable: true });
}).name;
