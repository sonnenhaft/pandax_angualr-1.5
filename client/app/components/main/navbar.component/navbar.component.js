import angular from 'angular';
import uiRouter from 'angular-ui-router';
import User from '../../../services/user/user';
import Constants from '../../../services/constant/constants';
import activeMenuItem from '../../../common/active-menu-item.directive';
import template from './navbar.html';

class controller {

  constructor(User, Constants, $state) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      $state
    });

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';
    this.defaultLink = Constants.user.defaultPage[User.get('role')];
    this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.submenu = _.filter(Constants.user.submenu, navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.mobile = false;
  }

  hideSubMenu(item) {
    if (item.url.length) {
      this.mobile = false;
    }
  }
}


export default angular.module('navbar', [
  uiRouter,
  User,
  Constants,
  activeMenuItem
]).component('navbar', {
  bindings: {
    userAvatarSrc: '='
  },
  template,
  controller
}).name;

