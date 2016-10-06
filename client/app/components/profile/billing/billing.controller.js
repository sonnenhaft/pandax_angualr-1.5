class BillingController {

  constructor ($state, User, Cards, $stateParams, Resolve, $mdToast, $q, OrderService) {
    'ngInject';

    _.assign(this, {
    	$state,
    	User,
    	$stateParams,
      Resolve,
      Cards,
      $mdToast,
      $q,
      OrderService,
      newCard: {},   //temporary
      saveLoading: false,
      defaultCardId: 0,
      hasPersonalInfo: false
    });

    this.defaultCardId = this.getDefaultCardId();
    this.hasPersonalInfo = this.billingInfo && this.billingInfo.first_name && this.billingInfo.last_name && this.billingInfo.phone;
  }

  saveInfo () {
    let promises = [];

    this.saveLoading = true;

    if (!this.hasPersonalInfo) {                                          // should save personal information
      let query = this.User
        .UpdateUserProfile(this.billingInfo);
      promises.push(query);
    }


    if (!this.billingInfo.cards || !this.billingInfo.cards.length) {      // should add card
      let query = this.Cards
        .add(this.newCard)
        .then(card => {
          if (card.message) {
            return card;
          }
        });
      promises.push(query);
    } else {
      if (this.defaultCardId != this.getDefaultCardId()) {
        /*
          ToDo: send request to change default card
          promises.push(query);
         */
      }
    }


    return this.$q.all(promises).then((data) => {
      let errorMessages = _.chain(data).filter('message').map('message').value();

      if (errorMessages.length) {
         this.showError(errorMessages.join(' ,'));
         this.saveLoading = false;
      } else {
        this.payForOrder()
          .then(data => {
            this.$state.go(this.$stateParams.from, {orderId: this.$stateParams.orderId});
          })
          .finally(() => {
            this.saveLoading = false;
          });
      }
    })
    .catch((data) => {
      console.log('errors', data);
    });
  }

  getDefaultCardId () {
    let result = 0;
    if (this.billingInfo.cards && this.billingInfo.cards.length > 0) {
      let defaultCardIndex = _.findIndex(this.billingInfo.cards, {is_default: true});
      result = defaultCardIndex >= 0 ? this.billingInfo.cards[defaultCardIndex].id : 0;
    }
    return result;
  }

  showError (message) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .content(message || message.type)
        .position('top right')
        .hideDelay(200000)
        .action('OK')
    );
  }

  payForOrder () {
    /*
      ToDo: add request to pay for order and after that send request for invite entertainer
     */
    return this.OrderService.inviteEntertainer(this.$stateParams.orderId, parseInt(this.$stateParams.entertainerId));
  }

}

export default BillingController;
