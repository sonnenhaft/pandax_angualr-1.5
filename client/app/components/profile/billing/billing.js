import angular from 'angular';
import uiRouter from 'angular-ui-router';
import billingComponent from './billing.component';
import User from '../../../services/user/user';
import Cards from '../../../services/card/card';
import personalInformation from '../profile-fields.component/personal-information.component/personal-information.component';
import cardList from '../profile-fields.component/card-list.component/card-list.component';
import cardInfo from '../profile-fields.component/card-info.component/card-info.component';

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
        url: '/billing/:orderId/:entertainerId?from',
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
          billingInfo: function (User, Cards) {
            let billingInfo = User.get();
            return Cards.getCards()
                    .then((data) => {
                      if (data) {
                        billingInfo = _.assign(billingInfo, {cards: data});
                      }
                      return billingInfo;
                    });
          },
          orderDetails: function (OrderService, orderId) {
            return OrderService.fetchOrderDetails(orderId)
                    .then((data) => {
                      return data;
                    });
          }

        }
      });
  })

  .component('billing', billingComponent)

  .name;

export default billingModule;
