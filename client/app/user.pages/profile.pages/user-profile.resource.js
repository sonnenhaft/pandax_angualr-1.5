import ngResource from 'angular-resource';

export default angular.module('UserProfileResource', [
  ngResource
]).factory('UserProfileResource', $resource => {
  'ngInject';

  return $resource('', {}, {
    uploadProviderPhotos: { url: '{{config_api_url}}/api/provider/profile/photo/:idx', method: 'PUT' },
    uploadCustomerPhoto: { url: '{{config_api_url}}/api/customer/profile/photo', method: 'PUT' },
    update: { url: '{{config_api_url}}/api/{{current_user_role}}/profile', method: 'PUT' },
  }, { cancellable: true });
}).name;
