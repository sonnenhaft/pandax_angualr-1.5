import ngResource from 'angular-resource';

export default angular.module('EntertainerRatingResource', [
  ngResource
]).factory('EntertainerRatingResource', $resource => {
  'ngInject';

  return $resource('', {}, {
    fetchRatings: { url: '{{config_api_url}}/api/provider/:provider_id/ratings', method: 'GET', interceptor: { response: ({ data }) => data } }
  });
}).name;
