export default class Signin {

  constructor (Validation, User) {
    'ngInject';

    _.assign(this, {Validation, User});

  }

  onSubmit (credentials) {
    if (this.validate(credentials)) {
      this.loginError = false;
      return this.login(credentials);
    }

    return false;
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
            this.loginError = result.error;
          }
        },
        error => {
          console.log(error);
          this.loginLoading = false;
        }
      );
  }

}
