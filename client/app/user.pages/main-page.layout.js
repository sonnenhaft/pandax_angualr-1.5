import Resolve from '../common-services/resolve.service';
import template from './main-page.layout.html';
import CustomersAdminPage from '../admin.pages/customers-admin.page/customers-admin.page';
import LoginPageComponent from '../login.pages/login.page/login.page.component';

export default angular.module('mainPageLayout', [
  Resolve
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main', {
    url: '/main',
    abstract: true,
    component: 'mainPageLayout',
    resolve: {
      providers: Resolve => {
        'ngInject';

        return Resolve.providers( );
      },
      allowPagesOrRedirect ($state, StatefulUserData) {
        'ngInject';

        if (StatefulUserData.isAdmin( )) {
          $state.go(CustomersAdminPage);
        } else if (!StatefulUserData.isCustomer( ) && !StatefulUserData.isProvider( )) {
          $state.go(LoginPageComponent);
        }
      }
    }
  });
}).component('mainPageLayout', {
  template,
  controller (StatefulUserData) {
    'ngInject';

    this.StatefulUserData = StatefulUserData;
  }
}).name;
