export default [
  { role: ['customer'], text: 'Create order', url: 'main.create-order' },
  // { role: ['customer'], text: 'Rate Entertainers', url: 'main.rate-entertainers' },
  { role: ['provider'], text: 'Order History', url: 'main.history' },
  { role: ['customer'], text: 'Orders', url: 'main.history' },
  { role: ['customer', 'provider'], text: 'Contact Us', url: 'main.contact-us' },
  { role: ['customer', 'provider'], text: 'Settings', url: '' },
  {
    role: ['admin'],
    text: 'Dashboard',
    // url: 'admin.dashboard',
    icon: { path: '/assets/images/icons/svg/navbar-admin/icon_dashboard.svg', styles: { height: '14px', width: '17px' } },
    hint: 'Dashboard'
  },
  {
    role: ['admin'],
    text: 'Entertainers',
    url: 'entertainersAdminPage',
    icon: { path: '/assets/images/icons/svg/navbar-admin/icon_providers.svg', styles: { height: '17px', width: '12px' } },
    hint: 'Entertainers'
  },
  {
    role: ['admin'],
    text: 'Customers',
    url: 'customersAdminPage',
    icon: { path: '/assets/images/icons/svg/navbar-admin/icon_customers.svg', styles: { height: '17px', width: '10px' } },
    hint: 'Customers'
  },
  {
    role: ['admin'],
    text: 'Orders',
    url: 'adminOrdersPage',
    icon: { path: '/assets/images/icons/svg/navbar-admin/icon_orders.svg', styles: { height: '15px', width: '12px' } },
    hint: 'Orders'
  },
  /* {
   role: ['admin'],
   text: 'Paysheet',
   url: 'admin.paysheet',
   icon: {path: '/assets/images/icons/svg/navbar-admin/icon_paysheet.svg', styles: {height: '12px', width: '18px'}}
   },*/
  {
    role: ['admin'],
    text: 'Log Out',
    url: 'admin.logout',
    icon: { path: '/assets/images/icons/svg/navbar-admin/icon_exit.svg', styles: { height: '16px', width: '16px' } },
    hint: 'Logout',
    bottom: true,
    isComponent: true,
    component: 'logout'
  }
];
