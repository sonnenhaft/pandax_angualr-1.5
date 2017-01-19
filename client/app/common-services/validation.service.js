/** @deprecated mass */
class Validation {

  /** @deprecated mass */
  constructor (moment) {
    'ngInject';

    this.moment = moment;
  }

  /** @deprecated mass */
  message (field, bool, txt) {
    return {
      name: field,
      valid: bool,
      text: !bool ? txt : 'Field is valid.'
    };
  }

  /** @deprecated mass */
  check (field, credentials) {
    switch (field) {
      case 'repeater':
        return this[field](credentials.password, credentials[field]);

      case 'old_password': // eslint-disable-line no-fallthrough
        return this.isEmpty(field, credentials[field]);

      default:
        return this[field] ? this[field](credentials[field]) : false;
    }
  }

  /** @deprecated mass */
  error (fields) {
    return _.remove(_.map(fields, (field, key) => {
      if (!this.check(key, fields).valid) {
        return this.check(key, fields);
      }
    }), undefined);
  }

  /** @deprecated mass */
  date (date) {
    if (!date) {
      return this.message('date', false, 'This field is required');
    } else if (!this.moment(date, 'MMMM DD, YYYY').isValid( )) {
      return this.message('date', false, 'Wrong date format');
    } else if (this.moment(date).startOf('date').isBefore(this.moment( ).startOf('date'))) {
      return this.message('date', false, 'Date should be in the future');
    } else if (this.moment(date).startOf('date').isAfter(this.moment( ).add(14, 'days').startOf('date'))) {
      return this.message('date', false, 'Date should be to 14 days in the future');
    } else {
      return this.message('date', true);
    }
  }


  /** @deprecated mass */
  password (password) {
    if (password) {
      return this.message('password', password && password.length >= 6, '6-character minimum');
    } else {
      return this.message('password', false, 'This field is required');
    }
  }

  /** @deprecated mass */
  repeater (pass, repeater) {
    if (repeater) {
      return this.message('repeater', pass === repeater, 'Password doesn’t match');
    } else {
      return this.message('repeater', false, 'This field is required');
    }
  }

  /** @deprecated mass */
  isEmpty (field, value) {
    return this.message(field, !_.isEmpty(value), 'This field is required');
  }

  /** @deprecated mass */
  apt ( ) {
    return this.message('apt', true);
  }
}

export default angular.module('Validation', []).service('Validation', Validation).name;
