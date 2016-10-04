export default class passwordController {

  constructor (User, Validation, Helper) {
    'ngInject';

    _.assign(this, {User, Validation, Helper});

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
      return this.reset(form.old_password, form.password);
    }

    return false;
  }

  reset (passwordOld, passwordNew) {
    this.resetLoading = true;
    this.User
      .changeByOld(passwordOld, passwordNew)
      .then(
        result => {
          console.log(result);
          this.resetLoading = false;

          if (result && result.error) {
            this.resetError = result.error;
            return false;
          }

          this.Helper.showToast('Your password was successfully changed', 4000);

          return true;
        },
        error => {
          this.resetLoading = false;
          console.log(error);
        }
      );
  }

}
