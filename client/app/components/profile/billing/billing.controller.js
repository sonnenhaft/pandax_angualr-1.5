class BillingController {

  constructor ($state, User, $stateParams, Resolve) {
    'ngInject';

    _.assign(this, {
    	$state,
    	User,
    	$stateParams,
      Resolve
    });
  }

  saveInfo () {
    let card
    this.Resolve.stripeCreateToken(this.newCard)
/*  	this.User.saveBillingInfo()
  		.then((_data) => {
  			this.$state.go(this.$stateParams.from);
  		});*/
  }

}

export default BillingController;
