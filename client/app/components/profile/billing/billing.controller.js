class BillingController {

  constructor ($state, User, $stateParams) {
    'ngInject';

    _.assign(this, {
    	$state,
    	User,
    	$stateParams
    });
  }

  saveInfo () {
  	this.User.saveBillingInfo()
  		.then((_data) => {
  			this.$state.go(this.$stateParams.from);
  		});
  }

}

export default BillingController;
