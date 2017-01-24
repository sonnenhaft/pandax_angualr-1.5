import template from './customers-admin.page.html';
import AdminDataResource from '../admin-data.resource';

import AbstractScrollableController from '../../common/abstract-scrollable.controller';

class controller extends AbstractScrollableController {
  statusType = 'customer'
  statuses = {
    '': 'All',
    blocked: 'Blocked',
    active: 'Active',
  }

  tableStatuses = {
    active: 'active',
    blocked: 'blocked',
    unblocked: 'unblocked'
  }

  constructor ($mdDialog, $q, AdminDataResource, $http, $location) {
    'ngInject';

    super( );
    Object.assign(this, { $mdDialog, $q, AdminDataResource, $http, $location });
    this.selectedStatus = this.$location.search( ).status;
  }

  _next (page) {
    const status = this.selectedStatus || undefined;
    this.$location.search({ status }).replace( );
    return this._getList({ page, status });
  }

  _getList (params) { return this.AdminDataResource.fetchCustomers(params); }

  filterByStatus ( ) {
    this.resetItems( );
    this.fetchMoreItems( );
  }

  setStatus (targetEvent, entity, targetStatus, showPopup = true, status) {
    if (!status) {
      status = targetStatus;
    }

    this.$q.when(showPopup && this.$mdDialog.show(this.$mdDialog.confirm({
      title: `${controller.getSmallStatus(status, true)} ${this.statusType}`,
      textContent: `Are you sure want to ${controller.getSmallStatus(status)} the ${this.statusType}?`,
      ariaLabel: 'Set status',
      ok: 'Yes',
      cancel: 'No',
      targetEvent
    })))
      .then(( ) => this.$http.post(`{{config_api_url}}/api/admin/${this.statusType}s/${entity.id}/status`, { set: targetStatus }))
      .then(({ data: { status } }) => entity.status = status);
  }

  static getSmallStatus (text, toCapitalize) {
    let statusResult = text.substr(0, 1);

    if (toCapitalize) {
      statusResult = statusResult.toUpperCase( );
    }

    if (text === 'active') {
      return statusResult + text.substr(1);
    } else if (text === 'approved') {
      return statusResult + text.substr(1, text.length - 2);
    } else {
      return statusResult + text.substr(1, text.length - 3);
    }
  }
}

export { controller };

const name = 'customersAdminPage';
export default angular.module(name, [
  AdminDataResource
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/customers?status',
    reloadOnSearch: false,
    parent: 'admin',
    name,
    component: name
  });
}).component(name, {
  template,
  controller
}).name;
