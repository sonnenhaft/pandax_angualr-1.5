import config from 'config';
import template from './customers.page.html';

class controller {
  currentPage = 0
  list = []
  statusType = 'customers'
  statuses = {
    active: 'active',
    blocked: 'blocked',
    unblocked: 'unblocked',
  }

  constructor (Request, $mdDialog, $q) {
    'ngInject';

    Object.assign(this, { Request, $mdDialog, $q });
    this.fetchMoreItems( );
  }

  _next (page) {
    return this.Request.send(null, 'GET', `${config.API_URL}/api/admin/customers?page=${page}`);
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;
    return this._next(this.currentPage + 1).then(({ data }) => {
      this.list = this.list.concat(data.items);
      const pagination = data.meta.pagination;
      this.currentPage = pagination.current_page;
      this.isLastPage = this.currentPage === pagination.total_pages;
    }).finally(( ) => {
      this.isOnProgress = false;
    });
  }

  setStatus (targetEvent, entity, targetStatus, showPopup = true, status) {
    const type = 'customer';
    if (!status) {
      status = targetStatus;
    }

    this.$q.when(showPopup && this.$mdDialog.show(this.$mdDialog.confirm({
      title: `${controller.getSmallStatus(status, true)} ${type}`,
      textContent: `Are you sure want to ${controller.getSmallStatus(status)} the ${type}?`,
      ariaLabel: 'Set status',
      ok: 'Yes',
      cancel: 'No',
      targetEvent
    })))
      .then(( ) => this.Request.send(null, 'POST', `${config.API_URL}/api/admin/${this.statusType}/${entity.id}/status`, { set: targetStatus }))
      .then(result => entity.status = result.data.status);
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
export default angular.module('customers', []).config($stateProvider => {
  'ngInject';

  $stateProvider.state('admin.customers', {
    url: '/customers',
    parent: 'admin',
    component: 'customers'
  });
}).component('customers', {
  template,
  controller
}).name;
