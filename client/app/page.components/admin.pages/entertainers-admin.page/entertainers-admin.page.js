import entertainerPhotosModal from '../../order.pages/manipulation-entertainers.component/entertainer-protos.modal/entertainer-protoes.modal';
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

  constructor ($http, $mdDialog, $q, entertainerPhotosModal, $window, $location, AdminDataResource) {
    'ngInject';

    super($mdDialog, $q, AdminDataResource, $http, $location);

    // so we expect that in required 'admin' component there is #admin div, sorry for this
    this.$scrollableElement = angular.element($window.document.getElementById('admin'));
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
