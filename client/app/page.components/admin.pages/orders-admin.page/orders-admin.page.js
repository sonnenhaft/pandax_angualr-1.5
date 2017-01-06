import AdminDataResource from '../admin-data.resource';
import template from './orders-admin.page.html';
import ORDER_STATUSES from '../../../common/ORDER_STATUSES';
import AbstractScrollableController from '../../../common/abstract-scrollable.controller';

class controller extends AbstractScrollableController {
  activeOrderIndex = -1
  typesOfService = []
  orderActive = null
  ORDER_STATUSES = ORDER_STATUSES

  constructor (AdminDataResource, Resolve, $location) {
    'ngInject';

    super( );
    this.dateCreatedFrom = new Date()

    Object.assign(this, { AdminDataResource, $location });
    Resolve.providers( ).then(typesOfService => this.typesOfService = typesOfService);
  }

  $onInit ( ) {
    const { orderId: activeOrderId, ...searchParams } = this.$location.search( );
    this.searchParams = searchParams;
    if (activeOrderId) {
      this.activeOrderId = activeOrderId;
      this.getOrderDetails(activeOrderId);
    }
    this.fetchMoreItems( );
  }

  _next ( ) {
    const page = this.currentPage;
    const resource = this.AdminDataResource.fetchOrders({ page, ...this.searchParams }).$promise.then(data => {
      if (data.items.length && !this.activeOrderId) {
        return this.getOrderDetails(data.items[0].id).then(( ) => data);
      } else {
        return data;
      }
    });
    return { $promise: resource };
  }

  filterData ( ) {
    this._setLocation( );
    this.resetItems( );
    this.fetchMoreItems( );
  }

  _setLocation ( ) {
    const orderId = this.activeOrderId;
    const paramsMap = Object.keys(this.searchParams)
      .filter(key => this.searchParams[key] !== '')
      .reduce((map, key) => {
        map[key] = this.searchParams[key];
        return map;
      }, {});
    this.$location.search({ ...paramsMap, ...{ orderId } }).replace( );
  }

  getOrderDetails (orderId) {
    this.isLoadingDetails = true;
    this.activeOrderId = orderId;
    this._setLocation( );
    return this.AdminDataResource.fetchOrderDetails({ orderId }).$promise.then(activeOrderDetails => {
      this.isLoadingDetails = false;
      return this.activeOrderDetails = activeOrderDetails;
    });
  }
}

const statusesViewCorrection = {
  canceled_by_provider: 'canceled by entertainer',
  canceled_by_customer: 'canceled by customer'
};

const name = 'adminOrdersPage';
export default angular.module(name, [
  AdminDataResource,
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/orders?orderId',
    parent: 'admin',
    reloadOnSearch: false,
    name,
    component: name
  });
}).component(name, {
  template,
  controller
}).filter('statusCorrection', ( ) => status => statusesViewCorrection[status] || status)
  .name;
