import angular from 'angular';
import uiRouter from 'angular-ui-router';
import searchEntertainersComponent from './searchEntertainers.component';
import OrderService from '../../../services/orderService/orderService';

export default angular
  .module('searchEntertainers', [
    uiRouter,
    OrderService
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.searchEntertainers', {
        url: '/searchEntertainers',
        parent: 'main',
        template: '<search-entertainers entertainers="entertainers"></search-entertainers>',
        controller: function ($scope, entertainers) {
          $scope.entertainers = entertainers;
        },
        resolve: {
          entertainers: function (OrderService) {
            return OrderService.fetchEntertainers();
          }
        }
      });
  })
  .component('searchEntertainers', searchEntertainersComponent)
  .name;
