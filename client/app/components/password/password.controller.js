export default class passwordController {

  constructor (User, Validation) {
    'ngInject';

    _.assign(this, {User, Validation});

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

  onChange (form) {
    if (this.validate(form)) {
      this.resetError = false;
      return this.reset(form.password, this.User.token());
    }

    return false;
  }

  reset (password, token) {
    this.resetLoading = true;
    this.User
      .reset({password}, token)
      .then(
        result => {
          console.log(result);
          this.resetLoading = false;

          if (result && result.error) {
            this.resetError = result.error;
            return false;
          }

          return true;
        },
        error => {
          this.resetLoading = false;
          console.log(error);
        }
      )
      .then(result => {
        console.log('Password changed')
      });
  }

}
