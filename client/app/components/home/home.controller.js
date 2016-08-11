class HomeController {

  constructor ($stateParams, Validation, User) {
    'ngInject';

    _.assign(this, {$stateParams, Validation, User});

    this.signIn = true;
    this.signUp = false;
    this.isCustomer = true;
    this.isProvider = false;

  }

  $onInit () {
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

    this.logignError = false;

    return this.signIn ?
      this.login(credentials) :
      this.register(credentials);
  }

  login (credentials) {
    this.loginLoading = true;
    this.User
      .login(credentials)
      .then(
        result => {
          this.loginLoading = false;
          if (result && result.error) {
            this.logignError = result.error;
          }
        },
        error => {
          console.log(error);
          this.loginLoading = false;
        }
      );
  }

  register (credentials) {
    this.registerLoading = true;
    this.User
      .register(credentials)
      .then(
        result => {
          this.registerLoading = false;
          if (result && result.error) {
            this.registerError = result.error;
          }
        },
        error => {
          console.log(error);
          this.registerLoading = false;
        }
      );
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

export default HomeController;
