export default class Signup {

  constructor (Validation, User) {
    'ngInject';

    _.assign(this, {Validation, User});

    this.isCustomer = true;
    this.isProvider = false;

  }

  onSubmit (credentials) {
    let isError, errorMessage;

    isError = this.Validation.error(credentials).length;
    errorMessage = this.Validation.error(credentials);
    credentials = _.assign(credentials, {
      type: this.isCustomer ? 'customer' : 'provider'
    });

    if (isError) {
      _.map(errorMessage, error => {
        this[error.name + 'Error'] = error.text;
      });

      return false;
    }

    this.logignError = false;

    return this.register(credentials);
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
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

}
