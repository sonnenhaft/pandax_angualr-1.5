class HomeController {

  constructor ($stateParams) {
    'ngInject';

    _.assign(this, {$stateParams});

    this.signIn = true;
    this.signUp = false;

  }

  $onInit () {
    if (this.$stateParams.signup && this.$stateParams.user) {
      this.signIn = false;
      this.signUp = true;
    }

    if (this.$stateParams.restore) {
      this.signIn = this.signUp = false;
      this.restore = true;
    }

    if (this.$stateParams.reset) {
      this.signIn = this.signUp = this.restore = false;
      this.reset = true;
    }
  }

  switchTo (form) {
    this.signIn = this.signUp = this.restore = this.reset = false;
    this[form] = true;
  }

}

export default HomeController;
