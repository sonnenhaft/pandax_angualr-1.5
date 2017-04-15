import entertainerPhotosModal from '../../user.pages/order.pages/manipulation-entertainers.component/entertainer-protos.modal/entertainer-protos.modal';
import { controller as CustomersPageController } from '../customers-admin.page/customers-admin.page';

import template from './entertainers-admin.page.html';
import AdminDataResource from '../admin-data.resource';

class controller extends CustomersPageController {
  statuses = {
    accepted: 'accepted',
    active: 'active',
    approved: 'approved',
    blocked: 'blocked',
    offline: 'offline',
    pending: 'pending',
    rejected: 'rejected',
    unblocked: 'unblocked',
  }

  constructor ($http, $mdDialog, $q, entertainerPhotosModal, $location, AdminDataResource) {
    'ngInject';

    super($mdDialog, $q, AdminDataResource, $http, $location);

    this.entertainerPhotosModal = entertainerPhotosModal;
    this.statusType = 'provider';
  }

  _getList (params) { return this.AdminDataResource.fetchEntertainers(params); }

  showPopup (targetEvent, index) {
    this.entertainerPhotosModal({
      photos: this.list[index].photos,
      photoIndexActive: 0
    }, targetEvent);
  }
}

const name = 'entertainersAdminPage';
export default angular.module(name, [
  entertainerPhotosModal,
  AdminDataResource
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/entertainers',
    parent: 'admin',
    reloadOnSearch: false,
    name,
    component: name
  });
}).component(name, {
  require: 'admin',
  template,
  controller
}).name;
