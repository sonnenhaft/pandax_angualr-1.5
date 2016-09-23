import angular from 'angular';
import uiRouter from 'angular-ui-router';
import entertainersComponent from './entertainers.component';
import EntertainersService from '../../../services/entertainersService/entertainersService';

export default angular
  .module('entertainers', [
    uiRouter,
    EntertainersService
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('admin.entertainers', {
        url: '/entertainers',
        parent: 'admin',
        template: '<entertainers\
                    entertainers="EntertainersService.list">\
                  </entertainers>',
        controller: function ($scope, EntertainersService) {
          $scope.EntertainersService = EntertainersService;
        },
        resolve: {
          entertainers: function (EntertainersService) {
            return EntertainersService.fetchEntertainers()
                    .then(data => data.itmes);
          }
        }
      });
  })
  .component('entertainers', entertainersComponent)
  .name;