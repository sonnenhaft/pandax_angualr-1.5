class BillingController {

  constructor ($state) {
    'ngInject';

    _.assign(this, {
    	$state
    });
console.log('bi:', this.billingInfo, this.$state);
  }

}

export default BillingController;
