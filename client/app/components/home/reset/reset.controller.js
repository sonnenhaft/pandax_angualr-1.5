export default class Reset {

  constructor (Validation, User, $stateParams) {
    'ngInject';

    _.assign(this, {Validation, User, $stateParams});

  }

  onSubmit (credentials) {
    if (this.validate(credentials)) {
      this.resetError = false;
      return this.reset(credentials.password, this.$stateParams.reset);
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

  reset (password, token) {
    this.resetLoading = true;
    this.User
      .reset({password}, token)
      .then(
        result => {
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
        if (result) {
          this.output({view: 'signIn'});
        }
      });
  }

}
