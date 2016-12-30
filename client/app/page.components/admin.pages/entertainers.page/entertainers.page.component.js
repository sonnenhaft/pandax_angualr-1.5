import config from 'config';

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

  constructor (Request, $mdDialog, $q, entertainerPhotosModal, $window) {
    'ngInject';

    super(Request, $mdDialog, $q);

    // so we expect that in required 'admin' component there is #admin div, sorry for this
    this.$scrollableElement = angular.element($window.document.getElementById('admin'));
    this.entertainerPhotosModal = entertainerPhotosModal;
    this.statusType = 'providers';
  }

  _next (page) {
    return this.Request.send(null, 'GET', `${config.API_URL}/api/provider?page=${page}`);
  }

  showPopup (ev, index) {
    this.entertainerPhotosModal({
      photos: this.list[index].photos,
      photoIndexActive: 0
    }, ev);
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
