export default class Validation {

  message (field, bool, txt) {
    return {
      name: field,
      valid: bool,
      text: !bool ? txt : 'Field is valid.'
    }
  }

  check (field, credentials) {
    if (field === 'repeater') {
      return this[field](credentials.password, credentials[field]);
    }

    return this[field](credentials[field]);
  }

  error (credentials) {
    let messages = _.map(credentials, (field, key) => {
      if (!this.check(key, credentials).valid) {
        return this.check(key, credentials);
      }
    });

    return _.remove(messages, undefined);
  }

  email (str) {
    if (str && str.length) {
      let validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str.toLowerCase());
      return this.message('email', validation, 'Email is not valid.');
    }
    return this.message('email', false, 'Email is not valid.');
  }

  password (str) {
    let validation = str.length >= 6;
    return this.message('password', validation, 'Password should contain more then 6 characters.');
  }

  repeater (pass, repeater) {
    if (pass != repeater) {
      return this.message('repeater', false, 'Passwords do not match.');
    }
    return this.message('repeater', true, 'Passwords do not match.');
  }

}
