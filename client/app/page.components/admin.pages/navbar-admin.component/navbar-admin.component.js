import User from '../../../common-services/user.service';
import activeMenuItem from '../../../common/active-menu-item.directive';

import template from './navbar-admin.html';
import './navbar-admin.scss';
import NAV_BAR_MENU_ITEMS from '../../../common/NAV_BAR_MENU_ITEMS';

class controller {
  collapsed = true

  constructor (User, $state) {
    'ngInject';

    Object.assign(this, { User, $state });

    // this.navigation = NAV_BAR_MENU_ITEMS.filter(navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.navigation = NAV_BAR_MENU_ITEMS.filter(({ navItem: { role } }) => role.indexOf('admin') >= 0);
  }
}

export default angular.module('navbarAdmin', [
  User,
  activeMenuItem
]).filter('navByPosition', ( ) => (navs, field, val) => navs.filter(item => item[field] == val)).component('navbarAdmin', {
  template,
  controller,
}).name;
