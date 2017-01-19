export default [
  {
    role: ['customer', 'provider'],
    parent: 'Settings',
    text: 'Payments',
    url: 'main.payments'
  },
  {
    role: ['customer', 'provider'],
    parent: 'Settings',
    text: 'Terms',
    url: 'acceptTermsAndConditionsPage'
  },
  {
    role: ['customer', 'provider'],
    parent: 'Settings',
    text: 'Change Password',
    url: 'main.password'
  },
  {
    role: ['customer'],
    parent: 'Settings',
    text: 'Edit profile',
    url: 'editProfilePage'
  },
  {
    role: ['provider'],
    parent: 'Settings',
    text: 'View profile',
    url: 'viewProfilePage'
  },
  {
    role: ['customer', 'provider'],
    parent: 'Settings',
    text: 'Log out',
    isComponent: true,
    component: 'logout'
  }
];
