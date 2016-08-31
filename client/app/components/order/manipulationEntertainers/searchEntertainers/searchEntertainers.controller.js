import photoFullPageTpl from '../photoFullPage/photoFullPage.html';
import photoFullPageCtrl from '../photoFullPage/photoFullPage.controller.js';

class searchEntertainersController {

  constructor (OrderService, $state, $mdDialog, $mdMedia, $stateParams) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
        $state,
        $mdDialog,
        $mdMedia,
        $stateParams,
     		photoActiveIndex: 0,
     		photoPreviewSrc: ''
     	});
  }

  goToEntertainerByIndex(direction) {
  	let possibleIndex = this.itemActiveIndex + direction;
  	if (possibleIndex >= 0 && possibleIndex < this.entertainers.length) {
      this.itemActiveIndex = possibleIndex;
  	}
  }

  showPopup(ev) {
    this.$mdDialog.show({
        controller: photoFullPageCtrl,
        controllerAs: 'vm',
        clickOutsideToClose: true,
        template: '<div layout="row" layout-align="end" class="icon_modal-close">\
                    <div class="icon_modal-close__image" ng-click="vm.$mdDialog.hide()"></div>\
                  </div>' + 
                  photoFullPageTpl,
        targetEvent: ev,
        bindToController: true,
        locals: {
          photos: this.entertainers[this.itemActiveIndex].photos,
          photoIndexActive: this.photoActiveIndex
        }
      });
  }

  goToNextStep() {    
    if (this.OrderService.fetchEntertainersInvitedCount() == 1) {
      this.$state.go('main.billing', {orderId: this.$stateParams.orderId, from: 'main.manipulationEntertainers'})
    } else {
      this.$state.go('main.searchEntertainers.confirmedEntertainers')
    }
  }

}

export default searchEntertainersController;
