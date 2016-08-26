class BillingController {

  constructor ($state, User, $stateParams, Resolve, $mdToast) {
    'ngInject';

    _.assign(this, {
    	$state,
    	User,
    	$stateParams,
      Resolve,
      $mdToast,
      newCard: {},   //temporary
      saveLoading: false
    });
  }

  saveInfo (_personalInformationForm, billingInformationForm) {
    let exp = this.newCard.expiry.split('/'), 
        card = {
          number: this.newCard.number,
          cvc: this.newCard.cvc,
          exp_month: exp[0],
          exp_year: exp[1],
          address_zip: this.newCard.zip
        };

    this.saveLoading = true;

    return this.Resolve.stripeCreateToken(card)
      .then((data) => {
console.log('data:', data);
        /*
          Send request to save token (id)
         */
      })
      .catch((err) => {
console.log('error:', err);
        this.$mdToast.show(
          this.$mdToast.simple()
            .content(err.message || err.type)
            .position('top right')
            .hideDelay(200000)
            .action('OK')
        );
      })
      .then((_data) => {
        this.saveLoading = false;
      })
  }

}

export default BillingController;
