import angular from 'angular';

export default angular.module('statusCorrection', [
]).filter('statusCorrection', Constants => {
  'ngInject';

  const statusesViewCorrection = Constants.order.statusesViewCorrection;

  return function statusCorrection (status) {
    return statusesViewCorrection[status] || status;
  };
}).name;
