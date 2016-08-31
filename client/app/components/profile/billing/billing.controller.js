class BillingController {

  constructor ($state, User, Cards, $stateParams, Resolve, $mdToast) {
    'ngInject';

    _.assign(this, {
    	$state,
    	User,
    	$stateParams,
      Resolve,
      Cards,
      $mdToast,
      newCard: {},   //temporary
      saveLoading: false
    });

  }

  saveInfo (_personalInformationForm, billingInformationForm) {
    this.saveLoading = true;

    return this
      .Cards
      .add(this.newCard)
      .then(card => {
        if (card.message) {
          this.showError(card.message);
        }

        this.saveLoading = false;
      });
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

}

export default BillingController;
