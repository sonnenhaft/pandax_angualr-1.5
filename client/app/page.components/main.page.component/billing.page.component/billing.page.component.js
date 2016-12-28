import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Cards from '../../../common-services/card.service';
import personalInformation from './personal-information.component/personal-information.component';
import cardList from './card-list.component/card-list.component';
import cardInfo from '../../../common/card-info.component/card-info.component';
import template from './billing.page.html';

class controller {
  constructor ($state, User, Cards, $stateParams, Resolve, $mdToast, $q, OrderService, Constants, $mdDialog) {
    'ngInject';

    Object.assign(this, {
      $state,
      User,
      $stateParams,
      Resolve,
      Cards,
      $mdToast,
      $q,
      OrderService,
      Constants,
      $mdDialog,
      newCard: {},   // temporary
      saveLoading: false,
      defaultCardId: 0,
      hasPersonalInfo: false
    });

    this.defaultCardId = this.getDefaultCardId( );
    this.hasPersonalInfo = this.billingInfo && this.billingInfo.first_name && this.billingInfo.last_name && this.billingInfo.phone;
  }

  saveInfo ( ) {
    const promises = [];

    this.saveLoading = true;

    if (!this.hasPersonalInfo) {                                          // should save personal information
      const query = this.User
        ._updateProfileOnServer(this.billingInfo);
      promises.push(query);
    }


    if (!this.billingInfo.cards || !this.billingInfo.cards.length) {      // should add card
      const query = this.Cards
        .add(this.newCard)
        .then(card => {
          if (card.message) {
            return card;
          }
        });
      promises.push(query);
    } else if (this.defaultCardId != this.getDefaultCardId( )) {
      /*
       ToDo: send request to change default card
       promises.push(query);
       */
    }

    return this.$q.all(promises).then(data => {
      this.payForOrder( )
        .then(data => {
          this.$state.go(this.$stateParams.from, { orderId: this.$stateParams.orderId });
        })
        .finally(( ) => {
          this.saveLoading = false;
        });
    })
      .finally(_data => {
        this.saveLoading = false;
      });
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
    return this.OrderService.payForOrder(this.$stateParams.orderId, this.getDefaultCardId( ))
      .then(
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
        .title(this.Constants.order.moneyReservationFailedMessage.title)
        .textContent(this.Constants.order.moneyReservationFailedMessage.content)
        .ariaLabel('Ban Dialog')
        .ok('Ok')
    );
  }

  goToPreviousStep ( ) {
    this.$state.go(this.$stateParams.from, { orderId: this.$stateParams.orderId });
  }
}

export default angular.module('billing', [
  uiRouter,
  personalInformation,
  cardList,
  cardInfo,
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
        return $stateParams.orderId || 0;
      },
      billingInfo (User, Cards) {
        let billingInfo = User.get( );
        return Cards.getCards( )
          .then(data => {
            if (data) {
              billingInfo = Object.assign(billingInfo, { cards: data });
            }
            return billingInfo;
          });
      },
      orderDetails (OrderService, orderId) {
        return OrderService.fetchOrderDetails(orderId).then(data => data);
      }
    }
  });
}).component('billing', {
  bindings: {
    billingInfo: '=',
    orderDetails: '='
  },
  template,
  controller
}).name;
