class HomeController {

  constructor ($stateParams, $state, Validation) {

    _.assign(this, {$stateParams, $state, Validation});

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

    this.$state.go('profile');
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[(this.signIn ? 'signIn' : 'signUp') + _.capitalize(error.name) + 'Error'] = error.text;
      });
      return false;
    }
    return true;
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
  'Validation'
];

export default HomeController;
