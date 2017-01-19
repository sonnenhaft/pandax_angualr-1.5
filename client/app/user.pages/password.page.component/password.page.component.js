import Validation from '../../common-services/validation.service';
import template from './password.page.html';

class controller {
  constructor (Validation, Helper, $http) {
    'ngInject';

    Object.assign(this, { Validation, Helper, $http });
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[`${error.name}Error`] = error.text;
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

  reset (old_password, new_password) {  // eslint-disable-line camelcase
    this.resetLoading = true;
    this.$http.post('{{config_api_url}}/api/password/change', {
      old_password, // eslint-disable-line camelcase
      new_password // eslint-disable-line camelcase
    }).then(result => {
      if (result.data.detail) {
        return { error: result.data.detail };
      } else {
        return result;
      }
    }).then(
      result => {
        this.resetLoading = false;
        if (result && result.error) {
          this.resetError = result.error;
          return false;
        } else {
          this.Helper.showToast('Your password was successfully changed', 4000);
          return true;
        }
      },
      error => {
        this.resetLoading = false;
        console.log(error);
      }
    );
  }

}

export default angular.module('password', [
  Validation
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main.password', {
    url: '/change-password',
    parent: 'main',
    component: 'password'
  });
}).component('password', {
  template,
  controller
}).name;
