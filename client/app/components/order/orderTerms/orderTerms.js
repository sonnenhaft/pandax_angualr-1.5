import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderTermsComponent from './orderTerms.component';

export default angular
  .module('orderTerms', [
    uiRouter
  ])
  .config($stateProvider => {
    "ngInject";

    $stateProvider
      .state('main.accept', {
        url: '/order/accept-terms',
        params: {
          order: {}
        },
        parent: 'main',
        controller: (order, $scope) => {
          $scope.order = order;
        },
        template: '<order-terms order="order"></order-terms>',
        resolve: {
          order: $stateParams => {
            return $stateParams.order;
          }
        }
      });
  })
  .component('orderTerms', orderTermsComponent)
  .name;
