export default class Signup {

  constructor (Validation, User, $stateParams) {
    'ngInject';

    _.assign(this, {Validation, User, $stateParams});

    this.isCustomer = true;
    this.isProvider = false;

  }

  $onInit () {
    if (this.$stateParams.signup && this.$stateParams.user) {
      this.isCustomer = this.isProvider = false;
      this['is' + _.capitalize(this.$stateParams.user)] = true;
    }
  }

  onSubmit (credentials) {
    if (this.validate(credentials)) {
      credentials = _.assign(credentials, {
        type: this.isCustomer ? 'customer' : 'provider'
      });
      this.registerError = false;
      return this.register(credentials);
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

  register (credentials) {
    this.registerLoading = true;
    this.User
      .register(credentials)
      .then(
        result => {
          if (result && result.error) {
            this.registerLoading = false;
            this.registerError = result.error;
          }
        },
        error => {
          this.registerLoading = false;
        }
      );
  }

}
