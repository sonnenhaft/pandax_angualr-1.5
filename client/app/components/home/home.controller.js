class HomeController {

  constructor ($stateParams, Validation, User) {
    'ngInject';

    _.assign(this, {$stateParams, Validation, User});

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
    credentials = _.assign(credentials, {
      type: this.isCustomer ? 'customer' : 'provider',
      auth: this.signIn
    });

    if (isError) {
      _.map(errorMessage, error => {
        this[
          (this.signIn ? 'signIn' : 'signUp') + _.capitalize(error.name) + 'Error'
        ] = error.text;
      });

      return false;
    }

    return this.signIn ?
      this.User.login(credentials) :
      this.User.register(credentials);
  }

  switchTo (form) {
    this.signIn = this.signUp = false;
    this.email = this.password = '';
    this[form] = true;
  }

}

export default HomeController;
