import ngResource from 'angular-resource';

export default angular.module('AdminDataResource', [
  ngResource
]).factory('AdminDataResource', $resource => {
  'ngInject';

  const resourceParams = { method: 'GET', isArray: false };
  return $resource('', {}, {
    fetchCustomers: { url: '{{config_api_url}}/api/admin/customers', ...resourceParams }, // {status, page}
    fetchEntertainers: { url: '{{config_api_url}}/api/provider', ...resourceParams }, // {status, page}
    fetchOrders: { url: '{{config_api_url}}/api/{{current_user_role}}/orders', ...resourceParams }, // {page},
    fetchOrderDetails: { url: '{{config_api_url}}/api/{{current_user_role}}/orders/:orderId', ...resourceParams } // {orderId},
  });
}).name;
