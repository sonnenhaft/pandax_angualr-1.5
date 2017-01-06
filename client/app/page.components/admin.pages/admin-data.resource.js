import ngResource from 'angular-resource';

export default angular.module('AdminDataResource', [
  ngResource
]).factory('AdminDataResource', $resource => {
  'ngInject';

  return $resource('', {}, {
    customersList: { url: '{{config_api_url}}/api/admin/customers', method: 'GET', interceptor: { response: ({ data }) => data }, isArray: false }, // {status, page}
    entertainersList: { url: '{{config_api_url}}/api/provider', method: 'GET', interceptor: { response: ({ data }) => data }, isArray: false }, // {status, page}
  });
}).name;
