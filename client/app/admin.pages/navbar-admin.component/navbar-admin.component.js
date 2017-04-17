import activeMenuItem from '../../common/active-menu-item.directive';

import template from './navbar-admin.html';
import './navbar-admin.scss';

const dashboardIcon = { path: '/assets/images/icons/svg/navbar-admin/icon_dashboard.svg', styles: { height: '14px', width: '17px' } };
const entertainersIcon = { path: '/assets/images/icons/svg/navbar-admin/icon_providers.svg', styles: { height: '17px', width: '12px' } };
const customersIcon = { path: '/assets/images/icons/svg/navbar-admin/icon_customers.svg', styles: { height: '17px', width: '10px' } };
const ordersIcon = { path: '/assets/images/icons/svg/navbar-admin/icon_orders.svg', styles: { height: '15px', width: '12px' } };
const paysheetIcon = { path: '/assets/images/icons/svg/navbar-admin/icon_paysheet.svg', styles: { height: '12px', width: '18px' } };
const logoutIcon = { path: '/assets/images/icons/svg/navbar-admin/icon_exit.svg', styles: { height: '16px', width: '16px' } };

const navigation = [
  // { text: 'Dashboard', url: 'admin.dashboard', icon: dashboardIcon, hint: 'Dashboard' },
  { text: 'Entertainers', url: 'entertainersAdminPage', icon: entertainersIcon, hint: 'Entertainers' },
  { text: 'Customers', url: 'customersAdminPage', icon: customersIcon, hint: 'Customers' },
  { text: 'Orders', url: 'adminOrdersPage', icon: ordersIcon, hint: 'Orders' },
  // { text: 'Paysheet', url: 'admin.paysheet', icon: paysheetIcon },
  { text: 'Log Out', url: 'admin.logout', icon: logoutIcon, hint: 'Logout', bottom: true, isComponent: true, component: 'logout' }
];

export default angular.module('navbarAdmin', [
  activeMenuItem
]).component('navbarAdmin', {
  template,
  controller ($state) {
    'ngInject';

    this.collapsed = true;
    Object.assign(this, { $state, navigation });
  }
}).filter('navByPosition', ( ) => (navs, field, val) => navs.filter(item => item[field] == val)).name;
