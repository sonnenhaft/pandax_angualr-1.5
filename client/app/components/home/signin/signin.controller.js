export default class Signin {

  constructor (Validation, User) {
    'ngInject';

    _.assign(this, {Validation, User});

  }

  onSubmit (credentials) {
    let isError, errorMessage;

    isError = this.Validation.error(credentials).length;
    errorMessage = this.Validation.error(credentials);

    if (isError) {
      _.map(errorMessage, error => {
        this[error.name + 'Error'] = error.text;
      });

      return false;
    }

    this.logignError = false;

    return this.login(credentials);
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

}
