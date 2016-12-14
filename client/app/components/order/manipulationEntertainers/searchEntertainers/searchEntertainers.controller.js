import photoFullPageTemplate from '../photoFullPage/photoFullPage.html';
import photoFullPageController from '../photoFullPage/photoFullPage.controller.js';

class searchEntertainersController {

  constructor (OrderService, $state, $mdDialog, $stateParams, Constants) {
     'ngInject';

     _.assign(this, {
     		OrderService,
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
    this.$mdDialog.show({
        controller: photoFullPageController,
        controllerAs: 'vm',
        clickOutsideToClose: true,
        template: '<div layout="row" layout-align="end" class="icon_modal-close">\
                    <div class="icon_modal-close__image" ng-click="vm.$mdDialog.hide()"></div>\
                  </div>' +
                  photoFullPageTemplate,
        targetEvent: ev,
        bindToController: true,
        locals: {
          photos: this.entertainers[this.itemActiveIndex].photos,
          photoIndexActive: this.photoActiveIndex
        }
      });
  }

  goToNextStep() {
    if (this.entertainersInvited.length == 0) {
      this.$state.go('main.billing', {orderId: this.$stateParams.orderId, entertainerId: this.entertainers[this.itemActiveIndex].id, from: 'main.manipulationEntertainers'});
    } else {
      this.OrderService.inviteEntertainer(this.$stateParams.orderId, this.entertainers[this.itemActiveIndex].id);
    }
  }

}

export default searchEntertainersController;
