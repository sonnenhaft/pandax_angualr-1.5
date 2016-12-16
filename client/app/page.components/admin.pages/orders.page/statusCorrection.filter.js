import angular from 'angular';

export default angular.module('statusCorrection', [
]).filter('statusCorrection', function(Constants) {
  'ngInject';

  let statusesViewCorrection = Constants.order.statusesViewCorrection;

  return function(status) {
    return statusesViewCorrection[status] || status;
  };
}).name;
