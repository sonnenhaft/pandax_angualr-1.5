class HomeController {

  constructor ($stateParams) {

    _.assign(this, {$stateParams});

    this.signIn = true;
    this.signUp = false;
    this.isCustomer = true;
    this.isProvider = false;

    this.onInit();

  }

  onInit () {
    if (this.$stateParams.signup && this.$stateParams.user) {
      this.signIn = this.isCustomer = this.isProvider = false;
      this['is' + _.capitalize(this.$stateParams.user)] = this.signUp = true;
    }
  }

  onSignUp (credentials) {
    console.log(credentials);
  }

  onSignIn (credentials) {
    console.log(credentials);
  }

}

HomeController.$inject = [
  '$stateParams'
];

export default HomeController;
