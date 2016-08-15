class BillingController {

  constructor ($state) {
    'ngInject';

    _.assign(this, {$state});
console.log('bi:', this.billingInfo);
  }

}

export default BillingController;
