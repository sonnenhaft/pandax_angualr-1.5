import activeMenuItem from '../../common/active-menu-item.directive';

import template from './navbar-admin.html';
import './navbar-admin.scss';
import NAV_BAR_MENU_ITEMS from '../../common/NAV_BAR_MENU_ITEMS';

class controller {
  collapsed = true

  constructor ($state) {
    'ngInject';

    Object.assign(this, { $state });

    // this.navigation = NAV_BAR_MENU_ITEMS.filter(navItem => navItem.role.indexOf(StatefulUserData.getRole( )) >= 0);
    this.navigation = NAV_BAR_MENU_ITEMS.filter(({ role }) => role.indexOf('admin') >= 0);
  }
}

export default angular.module('navbarAdmin', [
  activeMenuItem
]).filter('navByPosition', ( ) => (navs, field, val) => navs.filter(item => item[field] == val)).component('navbarAdmin', {
  template,
  controller,
}).name;
