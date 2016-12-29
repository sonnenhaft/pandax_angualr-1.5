import angular from 'angular';

class Validation {

  constructor (moment, Constants) {
    'ngInject';

    Object.assign(this, { moment, Constants });
  }

  message (field, bool, txt) {
    return {
      name: field,
      valid: bool,
      text: !bool ? txt : 'Field is valid.'
    };
  }

  check (field, credentials) {
    switch (field) {
      case 'repeater':
        return this[field](credentials.password, credentials[field]);

      case 'first_name':
      case 'last_name':
      case 'displaying_name':
      // case 'apt':
      case 'old_password': // eslint-disable-line no-fallthrough
        return this.isEmpty(field, credentials[field]);

      default:
        return this[field] ? this[field](credentials[field]) : false;
    }
  }

  error (fields) {
    const messages = _.map(fields, (field, key) => {
      if (!this.check(key, fields).valid) {
        return this.check(key, fields);
      }
    });

    return _.remove(messages, undefined);
  }

  location (point) {
    switch (true) {
      case _.isEmpty(point):
        return this.message('location', false, 'This field is required');

      case !_.isObject(point) || !point.location:
        return this.message('location', false, 'We don’t recognize the address');

      default:
        return this.message('location', true);
    }
  }

  date (date) {
    switch (true) {
      case !date:
        return this.message('date', false, 'This field is required');

      case !this.moment(date, 'MMMM DD, YYYY').isValid( ):
        return this.message('date', false, 'Wrong date format');

      case this.moment(date).startOf('date').isBefore(this.moment( ).startOf('date')):
        return this.message('date', false, 'Date should be in the future');

      case this.moment(date).startOf('date').isAfter(
        this.moment( ).add(this.Constants.order.maxPeriodForCreating.value, this.Constants.order.maxPeriodForCreating.key).startOf('date')
      ):
        return this.message('date', false, 'Date should be to 14 days in the future');

      default:
        return this.message('date', true);
    }
  }

  email (str) {
    switch (true) {
      case !str:
        return this.message('email', false, 'This field is required');

      case str.length > 100:
        return this.message('email', false, 'Max 100 characters allowed');

      case !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str.toLowerCase( )): // eslint-disable-line max-len
        return this.message('email', false, 'Email is not valid');

      default:
        return this.message('email', true);
    }
  }

  password (str) {
    switch (true) {
      case !str:
        return this.message('password', false, 'This field is required');

      default:
        return this.message('password', str && str.length >= 6, '6-character minimum');
    }
  }

  repeater (pass, repeater) {
    switch (true) {
      case !repeater:
        return this.message('repeater', false, 'This field is required');

      default:
        return this.message('repeater', pass === repeater, 'Password doesn’t match');
    }
  }

  images (arr) {
    const files = _.map(arr, 'file');
    const validation = _
      .chain(files)
      .map(file => _.isEmpty(file))
      .filter(boolean => boolean === false)
      .value( );

    return this.message('images', validation.length === 3, 'Please upload 3 photos');
  }

  phone (number) {
    switch (true) {
      case !number:
        return this.message('phone', false, 'This field is required');

      case !/(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}/.test(number):
        return this.message('phone', false, 'Phone number is invalid');

      default:
        return this.message('phone', true);
    }
  }

  isEmpty (field, value) {
    return this.message(field, !_.isEmpty(value), 'This field is required');
  }

  apt (field, value) {
    return this.message('apt', true);
  }

}

export default angular
  .module('Validation', [])
  .service('Validation', Validation)
  .name;
