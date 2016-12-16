import angular from 'angular';
import uiRouter from 'angular-ui-router';
import User from '../../../services/user/user';
import Constants from '../../../services/constant/constants';
import activeMenuItem from '../../../common/active-menu-item.directive';
import template from './navbar.html';
import NAV_BAR_MENU_ITEMS from '../../../common/NAV_BAR_MENU_ITEMS'
import NAV_BAR_SUB_MENU from './NAV_BAR_SUB_MENU'

class controller {
  constructor(User, Constants, $state) {
    'ngInject';

    Object.assign(this, {
      User,
      Constants,
      $state
    });

    this.isCustomer = User.get('role') === 'customer';
    this.isProvider = User.get('role') === 'provider';
    this.defaultLink = Constants.user.defaultPage[User.get('role')];
    this.navigation = NAV_BAR_MENU_ITEMS.filter(navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.submenu = NAV_BAR_SUB_MENU.filter(navItem => navItem.role.indexOf(User.get('role')) >= 0);
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

