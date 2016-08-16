class BillingController {

  constructor ($state, User, $stateParams) {
    'ngInject';

    _.assign(this, {
    	$state,
    	User,
    	$stateParams
    });
console.log('modify in controller:', this.User.billingInfo, this.$stateParams);
  }

  saveInfo () {
  	this.User.saveBillingInfo()
  		.then((data) => {
  			this.$state.go(this.$stateParams.from);
  		});
  }

}

export default BillingController;
