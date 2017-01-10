import OrderService from '../../../../common-services/orderService.service';
import billing from '../../../main.page.component/billing.page.component/billing.page.component';
import entertainerPhotosModal from '../entertainer-protos.modal/entertainer-protoes.modal';

import ratingsModalComponent from './view-entertainer-ratings.modal/view-entertainer-ratings.modal';

import template from './search-entertainers.page.html';

class controller {
  photoActiveIndex = 0
  modalName = 'entertainer-rating'

  constructor (OrderService, $state, $mdDialog, $stateParams, entertainerPhotosModal, $location) {
    'ngInject';

    Object.assign(this, { OrderService, entertainerPhotosModal, $state, $mdDialog, $stateParams, $location });
  }

  $onInit ( ) {
    if (this.$location.search( ).modal === this.modalName) {
      this.showRatings( );
    }
  }

  goToEntertainerByIndex (direction) {
    const possibleIndex = this.itemActiveIndex + direction;
    if (possibleIndex >= 0 && possibleIndex < this.entertainers.length) {
      this.itemActiveIndex = possibleIndex;
      this.photoActiveIndex = 0;
    }
  }

  showPopup (ev) {
    this.entertainerPhotosModal({
      photos: this.entertainers[this.itemActiveIndex].photos,
      photoIndexActive: this.photoActiveIndex
    }, ev);
  }

  goToNextStep ( ) {
    if (this.entertainersInvited.length == 0) {
      this.$state.go('main.billing', {
        orderId: this.$stateParams.orderId,
        entertainerId: this.entertainers[this.itemActiveIndex].id,
        from: 'main.manipulationEntertainers'
      });
    } else {
      this.OrderService.inviteEntertainer(this.$stateParams.orderId, this.entertainers[this.itemActiveIndex].id);
    }
  }

  showRatings (targetEvent) {
    this.$location.search({ modal: this.modalName }).replace( );
    this.$mdDialog.show({
      controller: angular.noop,
      controllerAs: '$ctrl',
      clickOutsideToClose: true,
      template: '<ratings-modal-component user-id="$ctrl.userId"></ratings-modal-component>',
      targetEvent,
      bindToController: true,
      locals: {
        userId: this.entertainers[this.itemActiveIndex].id
      }
    }).finally(( ) => {
      this.$location.search({ modal: null }).replace( );
    });
  }
}

export default angular.module('searchEntertainers', [
  billing,
  OrderService,
  entertainerPhotosModal,
  ratingsModalComponent
]).component('searchEntertainers', {
  bindings: {
    entertainers: '=',
    itemActiveIndex: '=',
    entertainersInvited: '='
  },
  template,
  controller
}).name;
