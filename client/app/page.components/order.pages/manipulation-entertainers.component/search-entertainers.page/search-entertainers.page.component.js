import OrderService from '../../../../common-services/orderService.service';
import billing from '../../../main.page.component/billing.page.component/billing.page.component';
import entertainerPhotosModal from '../entertainer-protos.modal/entertainer-protoes.modal';

import template from './search-entertainers.page.html';

class controller {
  photoActiveIndex = 0

  constructor (OrderService, $state, $mdDialog, $stateParams, entertainerPhotosModal) {
    'ngInject';

    Object.assign(this, { OrderService, entertainerPhotosModal, $state, $mdDialog, $stateParams });
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
    this.$mdDialog.show({
      controller: angular.noop,
      controllerAs: '$ctrl',
      clickOutsideToClose: true,
      template: `<div layout="row" layout-align="end" class="icon_modal-close">
                    <div class="icon_modal-close__image icon_modal-close__image_right" ng-click="vm.$mdDialog.hide()"></div>
                  </div>
  <ratings user-id="$ctrl.userId"></ratings>
`,
      targetEvent,
      bindToController: true,
      locals: {
        userId: this.entertainers[this.itemActiveIndex].id
      }
    });
  }
}

export default angular.module('searchEntertainers', [
  billing,
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
