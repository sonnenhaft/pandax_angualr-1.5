export default class Validation {

  message (field, bool, txt) {
    return {
      name: field,
      valid: bool,
      text: !bool ? txt : 'Field is valid.'
    }
  }

  check (field, credentials) {
    switch (field) {
      case 'repeater':
        return this[field](credentials.password, credentials[field]);

      case 'first_name':
      case 'last_name':
      case 'displaying_name':
      case 'phone':
        return this.isEmpty(field, credentials[field]);

      default:
        return this[field](credentials[field]);
    }
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
    return this.message('password', str.length >= 6, 'Password should contain more then 6 character.');
  }

  repeater (pass, repeater) {
    return this.message('repeater', pass === repeater, 'Passwords do not match.');
  }

  images (arr) {
    if (!_.find(arr, image => image.file.name)) {
      return this.message('images', false, 'Please upload at least one photo.');
    }
    return this.message('images', true);
  }

  isEmpty (field, value) {
    return this.message(field, !_.isEmpty(value), 'Field is empty!');
  }

}
