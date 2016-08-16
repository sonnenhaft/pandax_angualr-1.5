import angular from 'angular';
import uiRouter from 'angular-ui-router';
import billingComponent from './billing.component';
import User from '../../../services/user/user';

let billingModule = angular.module('billing', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.billing', {
        url: '/billing?from',
        parent: 'main',
        template: '<billing \
                    billing-info="billingInfo" \
                  </billing>',
        controller: function ($scope, billingInfo, User) {
          $scope.billingInfo = billingInfo;
        },
        resolve: {
          billingInfo: function (User) {
            return User.fetchBillingInfo();
          }
        }
      });
  })

  .component('billing', billingComponent)

  .name;

export default billingModule;
