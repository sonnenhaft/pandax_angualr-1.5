import AdminDataResource from '../admin-data.resource';
import template from './orders-admin.page.html';
import ORDER_STATUSES from '../../common/ORDER_STATUSES';
import AbstractScrollableController from '../../common/abstract-scrollable.controller';
import FindLocationComponent from '../../inputs/panda-find-location.input/panda-find-location.input';

class controller extends AbstractScrollableController {
  activeOrderIndex = -1
  typesOfService = []
  orderActive = null
  SATUSES = {
    no_invites: 'No Invites',
    not_confirmed: 'Not Confirmed',
    accepted: 'Accepted',
    declined: 'Declined',
    completed: 'Completed',
    canceled_by_customer: 'Canceled by Customer',
    canceled_by_entertainer: 'Canceled by Entertainer'
  }

  constructor (AdminDataResource, Resolve, $location) {
    'ngInject';

    super( );
    this.dateCreatedFrom = new Date( );

    Object.assign(this, { AdminDataResource, $location });
    Resolve.providers( ).then(typesOfService => this.typesOfService = typesOfService);
  }

  DATE_KEYS = ['create_dt_from', 'create_dt_to', 'start_dt_from', 'start_dt_to']
  NUMBER_KEYS = ['cost_from', 'cost_to']

  $onInit ( ) {
    const { orderId: activeOrderId, ...searchParams } = this.$location.search( );
    this.searchParams = searchParams;

    Object.keys(searchParams).filter(key => this.DATE_KEYS.includes(key)).forEach(key => {
      this.searchParams[key] = new Date(searchParams[key]);
    });
    Object.keys(searchParams).filter(key => this.NUMBER_KEYS.includes(key)).forEach(key => {
      this.searchParams[key] = searchParams[key] - 0;
    });

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
        this.activeOrderDetails = this.activeOrderId = null;
        this._setLocationSearchParams( );
        return data;
      }
    });
    return { $promise: resource };
  }

  filterData ( ) {
    this._setLocationSearchParams( );
    this.resetItems( );
    this.fetchMoreItems( );
  }

  _setLocationSearchParams ( ) {
    const orderId = this.activeOrderId;
    const paramsMap = Object.keys(this.searchParams)
      .filter(key => {
        const value = this.searchParams[key];
        return value !== '' && value !== null;
      })
      .reduce((map, key) => {
        if (this.DATE_KEYS.includes(key)) {
          map[key] = this.searchParams[key].toISOString( );
        } else {
          map[key] = this.searchParams[key];
        }
        return map;
      }, {});

    this.$location.search({ ...paramsMap, ...{ orderId } }).replace( );
  }

  getOrderDetails (orderId) {
    this.isLoadingDetails = true;
    this.activeOrderId = orderId;
    this._setLocationSearchParams( );
    return this.AdminDataResource.fetchOrderDetails({ orderId }).$promise.then(activeOrderDetails => {
      this.isLoadingDetails = false;
      return this.activeOrderDetails = activeOrderDetails;
    });
  }
}

const name = 'adminOrdersPage';
export default angular.module(name, [
  AdminDataResource,
  FindLocationComponent
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
}).name;
