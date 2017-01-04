import template from './customers.page.html';

class controller {
  currentPage = 0
  list = []
  statusType = 'customer'
  statuses = {
    active: 'active',
    blocked: 'blocked',
    unblocked: 'unblocked',
  }

  constructor ($http, $mdDialog, $q) {
    'ngInject';

    Object.assign(this, { $http, $mdDialog, $q });
    this.fetchMoreItems( );
  }

  _next (page) {
    return this.$http.get(`{{config_api_url}}/api/admin/customers?page=${page}`);
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;
    return this._next(this.currentPage + 1).then(({ data: { items, meta: { pagination } } }) => {
      this.list = this.list.concat(items);
      this.currentPage = pagination.current_page;
      this.isLastPage = this.currentPage === pagination.total_pages;
    }).finally(( ) => {
      this.isOnProgress = false;
    });
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
