import angular from 'angular';
import uiRouter from 'angular-ui-router';
import billingComponent from './billing.component';
import User from '../../../services/user/user';
import Cards from '../../../services/card/card';
import personalInformation from '../../../common/profileFields/personalInformation/personalInformation';
import cardList from '../../../common/profileFields/cardList/cardList';
import cardInfo from '../../../common/profileFields/cardInfo/cardInfo';

let billingModule = angular.module('billing', [
  uiRouter,
  personalInformation,
  cardList,
  cardInfo,
  Cards
])

  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.billing', {
        url: '/billing/:orderId?from',
        parent: 'main',
        template: '<billing \
                    billing-info="billingInfo" \
                    order-details="orderDetails" \
                  </billing>',
        controller: function ($scope, billingInfo, orderDetails) {
          $scope.billingInfo = billingInfo;
          $scope.orderDetails = orderDetails;
        },
        resolve: {
          orderId: function ($stateParams) {
            return $stateParams['orderId'] || 0;
          },
          billingInfo: function (User) {
            return User.fetchBillingInfo();
          },
          orderDetails: function (OrderService, orderId) {
            return OrderService.fetchOrderDetails(orderId);
          }

        }
      });
  })

  .component('billing', billingComponent)

  .name;

export default billingModule;
