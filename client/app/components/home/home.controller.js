class HomeController {

  constructor ($stateParams, $state, Validation, Storage) {

    _.assign(this, {$stateParams, $state, Validation, Storage});

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

  onSubmit (credentials) {
    let isError, errorMessage;

    isError = this.Validation.error(credentials).length;
    errorMessage = this.Validation.error(credentials);

    if (isError) {
      _.map(errorMessage, error => {
        this[
          (this.signIn ? 'signIn' : 'signUp') + _.capitalize(error.name) + 'Error'
        ] = error.text;
      });

      return false;
    }

    this.Storage.setObject('MINX', {
      token: 'falseToken!ufhuishdfihsduf723e.rjueifgh8923yrhjo3nknhurfhg9823ornlkfn',
      user: {
        email: credentials.email,
        type: this.isCustomer ? 'customer' : 'provider'
      }
    });

    this.$state.go('profile');
  }

  switchTo (form) {
    this.signIn = this.signUp = false;
    this.email = this.password = '';
    this[form] = true;
  }

}

HomeController.$inject = [
  '$stateParams',
  '$state',
  'Validation',
  'Storage'
];

export default HomeController;
