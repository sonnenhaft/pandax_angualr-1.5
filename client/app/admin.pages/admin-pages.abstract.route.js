import navbarAdmin from './navbar-admin.component/navbar-admin.component';
import entertainers from './entertainers-admin.page/entertainers-admin.page';
import customers from './customers-admin.page/customers-admin.page';
import orders from './orders-admin.page/orders-admin.page';

import LoginPageComponent from '../login.pages/login.page/login.page.component';
import ContactUsPage from '../user.pages/contact-us.page.component/contact-us.page.component';

import template from './admin-pages.layout.html';

const component = 'admin';
export default angular.module(component, [
  navbarAdmin,
  entertainers,
  customers,
  orders
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state(component, {
    url: '/admin',
    abstract: true,
    component,
    resolve: {
      allowPagesOrRedirect ($state, StatefulUserData) {
        'ngInject';

        if (StatefulUserData.isCustomer( ) || StatefulUserData.isProvider( )) {
          $state.go(ContactUsPage);
        } else if (!StatefulUserData.isAdmin( )) {
          $state.go(LoginPageComponent);
        }
      }
    }
  });
}).component(component, {
  template
}).name;
