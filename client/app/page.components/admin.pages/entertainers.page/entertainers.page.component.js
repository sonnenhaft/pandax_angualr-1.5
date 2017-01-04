import entertainerPhotosModal from '../../order.pages/manipulationEntertainers/entertainer-protos.modal/entertainer-protoes.modal';
import { controller as CustomersPageComponent } from '../customers.page/customers.page.component';

import template from './entertainers.page.html';

class controller extends CustomersPageComponent {
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

  constructor ($http, $mdDialog, $q, entertainerPhotosModal, $window) {
    'ngInject';

    super($http, $mdDialog, $q);

    // so we expect that in required 'admin' component there is #admin div, sorry for this
    this.$scrollableElement = angular.element($window.document.getElementById('admin'));
    this.entertainerPhotosModal = entertainerPhotosModal;
    this.statusType = 'provider';
  }

  _next (page) {
    return this.$http.get(`{{config_api_url}}/api/provider?page=${page}`);
  }

  showPopup (targetEvent, index) {
    this.entertainerPhotosModal({
      photos: this.list[index].photos,
      photoIndexActive: 0
    }, targetEvent);
  }
}

const name = 'entertainersPage';
export default angular.module(name, [
  entertainerPhotosModal
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('admin.entertainers', {
    url: '/entertainers',
    parent: 'admin',
    component: name
  });
}).component(name, {
  require: 'admin',
  template,
  controller
}).name;
