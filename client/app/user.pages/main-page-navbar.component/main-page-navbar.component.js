import activeMenuItem from '../../common/active-menu-item.directive';
import NAV_BAR_SUB_MENU from './NAV_BAR_SUB_MENU';
import template from './main-page-navbar.html';

const NAV_BAR_MENU_ITEMS = [
  { role: ['customer'], text: 'Create order', url: 'main.create-order' },
// { role: ['customer'], text: 'Rate Entertainers', url: 'main.rate-entertainers' },
  { role: ['provider'], text: 'Orders History', url: 'ordersHistoryPages' },
  { role: ['customer'], text: 'Orders', url: 'ordersHistoryPages' },
  { role: ['customer', 'provider'], text: 'Contact Us', url: 'main.contact-us' },
  { role: ['customer', 'provider'], text: 'Settings', url: '' }
];

class controller {
  constructor ($state, StatefulUserData) {
    'ngInject';

    Object.assign(this, { $state, StatefulUserData });
    this.isCustomer = StatefulUserData.isCustomer( );
    this.isProvider = StatefulUserData.isProvider( );
    this.defaultLink = {
      customer: 'main.create-order',
      provider: 'viewProfilePage'
    }[StatefulUserData.getRole( )];
    this.navigation = NAV_BAR_MENU_ITEMS.filter(({ role }) => role.indexOf(StatefulUserData.getRole( )) >= 0);
    this.submenu = NAV_BAR_SUB_MENU.filter(({ role }) => role.indexOf(StatefulUserData.getRole( )) >= 0);
    this.mobile = false;
  }

  hideSubMenu (item) {
    if (item.url.length) {
      this.mobile = false;
    }
  }
}

export default angular.module('mainPageNavbar', [

  activeMenuItem
]).component('mainPageNavbar', {
  bindings: { userAvatarSrc: '=' },
  template,
  controller
}).name;

