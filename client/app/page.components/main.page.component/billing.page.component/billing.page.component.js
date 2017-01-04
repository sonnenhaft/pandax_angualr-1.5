import config from 'config';
import Cards from '../../../common-services/card.service';
import personalInformation from './personal-information.component/personal-information.component';
import cardList from './card-list.component/card-list.component';
import cardInfo from '../../../common/card-info.component/card-info.component';

import template from './billing.page.html';

class controller {
  newCard = {}   // temporary
  saveLoading = false
  defaultCardId = 0
  hasPersonalInfo = false

  constructor ($state, Cards, $stateParams, Resolve, $mdToast, $q, OrderService, $mdDialog, StatefulUserData) {
    'ngInject';

    Object.assign(this, { $state, $stateParams, Resolve, Cards, $mdToast, $q, OrderService, $mdDialog, StatefulUserData });

    this.defaultCardId = this.getDefaultCardId( );
    this.hasPersonalInfo = this.billingInfo && this.billingInfo.first_name && this.billingInfo.last_name && this.billingInfo.phone;
  }

  saveInfo ( ) {
    const promises = [];

    this.saveLoading = true;

    if (!this.hasPersonalInfo) {
      return this.Request.put(`${config.API_URL}/api/${this.StatefulUserData.getRole( )}/profile`, this.billingInfo);
    }

    if (!this.billingInfo.cards || !this.billingInfo.cards.length) {      // should add card
      promises.push(this.Cards.add(this.newCard).then(card => {
        if (card.message) {
          return card;
        }
      }));
    } else if (this.defaultCardId != this.getDefaultCardId( )) {
      // ToDo: send request to change default card
    }

    return this.$q.all(promises)
      .then(( ) => this.payForOrder( ))
      .then(( ) => this.$state.go(this.$stateParams.from, { orderId: this.$stateParams.orderId }))
      .finally(( ) => this.saveLoading = false);
  }

  getDefaultCardId ( ) {
    let result = 0;
    if (this.billingInfo.cards && this.billingInfo.cards.length > 0) {
      const defaultCardIndex = _.findIndex(this.billingInfo.cards, { is_default: true });
      result = defaultCardIndex >= 0 ? this.billingInfo.cards[defaultCardIndex].id : 0;
    }
    return result;
  }

  showError (message) {
    this.$mdToast.show(
      this.$mdToast.simple( )
        .content(message || message.type)
        .position('top right')
        .hideDelay(200000)
        .action('OK')
    );
  }

  payForOrder ( ) {
    return this.OrderService.payForOrder(this.$stateParams.orderId, this.getDefaultCardId( )).then(
      data => this.OrderService.inviteEntertainer(this.$stateParams.orderId, parseInt(this.$stateParams.entertainerId, 10)),
      error => {
        this.showMoneyReservationFailedPopUp( );
        const defer = this.$q.defer( );
        defer.reject(error);
        return defer.promise;
      });
  }

  showMoneyReservationFailedPopUp ( ) {
    this.$mdDialog.show(
      this.$mdDialog.alert( )
        .clickOutsideToClose(true)
        .title('Money reservation failed')
        .textContent('Money capture failed. Please try another card.')
        .ariaLabel('Ban Dialog')
        .ok('Ok')
    );
  }

  goToPreviousStep ( ) {
    this.$state.go(this.$stateParams.from, { orderId: this.$stateParams.orderId });
  }
}

export default angular.module('billing', [
  personalInformation,
  cardInfo,
  cardList,
  Cards
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.billing', {
    url: '/billing/:orderId/:entertainerId?from',
    parent: 'main',
    template: '<billing billing-info="billingInfo"  order-details="orderDetails" </billing>',
    controller ($scope, billingInfo, orderDetails) {
      $scope.billingInfo = billingInfo;
      $scope.orderDetails = orderDetails;
    },
    resolve: {
      orderId ($stateParams) {
        'ngInject';

        return $stateParams.orderId || 0;
      },
      orderDetails (OrderService, orderId) {
        'ngInject';

        return OrderService.fetchOrderDetails(orderId);
      },
      billingInfo (StatefulUserData, Cards) {
        'ngInject';

        return Cards.getCards( ).then(cards => Object.assign({}, StatefulUserData.getUser( ), { cards }));
      }
    }
  });
}).component('billing', {
  bindings: { billingInfo: '=', orderDetails: '=' },
  template,
  controller
}).name;
