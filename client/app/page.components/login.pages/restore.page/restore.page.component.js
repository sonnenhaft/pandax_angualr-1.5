import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Validation from '../../../common-services/validation.service';
import User from '../../../common-services/user.service';
import template from './restore.page.html';

class controller {
  constructor (Validation, User, $mdDialog, $state) {
    'ngInject';

    Object.assign(this, { Validation, User, $mdDialog, $state });
  }

  onSubmit (email, $event) {
    if (this.validate(email)) {
      this.restoreError = false;
      return this.restore(email, $event);
    } else {
      return false;
    }
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[`${error.name}Error`] = error.text;
      });
      return false;
    } else {
      return true;
    }
  }

  restore (email, $event) {
    this.restoreLoading = true;
    return this.User.restore(email).then(result => {
      if (result && result.error) {
        this.restoreError = result.error;
        return false;
      } else {
        return true;
      }
    }).then(result => {
      if (result) {
        this.showMessage($event);
      }
    }).finally(error => this.restoreLoading = false);
  }

  showMessage ($event) {
    this.$mdDialog.show({
      contentElement: '#restore-success',
      parent: document.body,
      targetEvent: $event,
      clickOutsideToClose: false
    });
  }

  hideMessage ( ) {
    this.$mdDialog.hide( );
    this.$state.go('loginPage');
  }
}

export default angular.module('restorePage', [
  uiRouter,
  Validation,
  User
]).component('restorePage', {
  template,
  controller
}).name;
