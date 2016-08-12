class HomeController {

  constructor ($stateParams) {
    'ngInject';

    _.assign(this, {$stateParams});

    this.signIn = true;
    this.signUp = false;

  }

  $onInit () {
    if (this.$stateParams.signup && this.$stateParams.user) {
      this.signIn = this.isCustomer = this.isProvider = false;
      this['is' + _.capitalize(this.$stateParams.user)] = this.signUp = true;
    }
  }

  switchTo (form) {
    this.signIn = this.signUp = false;
    this[form] = true;
  }

}

export default HomeController;
