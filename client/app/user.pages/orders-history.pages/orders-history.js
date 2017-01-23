import FutureOrdersTab from './future-orders.customer.tab/future-orders.customer.tab';
import PastOrdersCustomerTab from './past-orders.customer.tab/past-orders.customer.tab';
import PastOrdersProviderTab from './past-orders.provider.tab/past-orders.provider.tab';
import OrderService from '../../common-services/orderService.service';
import template from './orders-history.layout.html';

class controller {
  TABS_ARRAY = ['future', 'history']

  constructor ($stateParams, StatefulUserData, $http) {
    'ngInject';

    Object.assign(this, { $stateParams, StatefulUserData });

    this.isProvider = this.StatefulUserData.isProvider( );

    if (this.isProvider) {
      $http.get('{{config_api_url}}/api/status').then(({ data: user = {} }) => {
        this.isOnPending = user.status === 'pending';
      });
    }
  }

  $onInit ( ) {
    this.selectedTab = this.TABS_ARRAY.indexOf(this.$stateParams.type || 'future');
  }
}

const component = 'ordersHistoryPages';
export default angular.module(component, [
  FutureOrdersTab,
  PastOrdersCustomerTab,
  OrderService,
  PastOrdersProviderTab
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('ordersHistoryPages', {
    url: '/orders-history?type',
    reloadOnSearch: false,
    parent: 'main',
    name: component,
    component
  });
}).component(component, {
  template,
  controller
}).name;
