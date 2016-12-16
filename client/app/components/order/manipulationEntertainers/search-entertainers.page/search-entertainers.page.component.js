import angular from 'angular';
import uiRouter from 'angular-ui-router';
import OrderService from '../../../../services/orderService/orderService';
import billing from '../../../profile/billing.page.component/billing.page.component';
import entertainerPhotosModal from '../entertainer-protos.modal/entertainer-protoes.modal.js';

import template from './search-entertainers.page.html';

class controller {
  constructor(OrderService, $state, $mdDialog, $stateParams, Constants, entertainerPhotosModal) {
    'ngInject';

    Object.assign(this, {
      OrderService,
      entertainerPhotosModal,
      $state,
      $mdDialog,
      $stateParams,
      Constants,
      photoActiveIndex: 0
    });
  }

  goToEntertainerByIndex(direction) {
    let possibleIndex = this.itemActiveIndex + direction;
    if (possibleIndex >= 0 && possibleIndex < this.entertainers.length) {
      this.itemActiveIndex = possibleIndex;
      this.photoActiveIndex = 0;
    }
  }

  showPopup(ev) {
    this.entertainerPhotosModal({
      photos: this.entertainers[this.itemActiveIndex].photos,
      photoIndexActive: this.photoActiveIndex
    }, ev)
  }

  goToNextStep() {
    if (this.entertainersInvited.length == 0) {
      this.$state.go('main.billing', { orderId: this.$stateParams.orderId, entertainerId: this.entertainers[this.itemActiveIndex].id, from: 'main.manipulationEntertainers' });
    } else {
      this.OrderService.inviteEntertainer(this.$stateParams.orderId, this.entertainers[this.itemActiveIndex].id);
    }
  }
}

export default angular.module('searchEntertainers', [
  billing,
  uiRouter,
  OrderService,
  entertainerPhotosModal
]).component('searchEntertainers', {
  bindings: {
    entertainers: '=',
    itemActiveIndex: '=',
    entertainersInvited: '='
  },
  template,
  controller
}).name;
