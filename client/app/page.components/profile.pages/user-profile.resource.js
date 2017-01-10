import ngResource from 'angular-resource';

export default angular.module('UserProfileResource', [
  ngResource
]).factory('UserProfileResource', $resource => {
  'ngInject';

  return $resource('', {}, {
    uploadPhoto: { url: '{{config_api_url}}/api/{{current_user_role}}/profile/photo/:slot_id', method: 'PUT' },
    uploadSinglePhoto: { url: '{{config_api_url}}/api/{{current_user_role}}/profile/photo', method: 'PUT' },
    update: { url: '{{config_api_url}}/api/{{current_user_role}}/profile', method: 'PUT' },
  }, { cancellable: true });
}).name;
