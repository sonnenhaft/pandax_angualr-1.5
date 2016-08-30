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
     		entertainer: null,
     		index: 0,
     		photoPreviewSrc: ''
     	});

     this.init();
  }

  init () {
     if (this.entertainers.length > 0) {
     		this.index = 0;
     		this.entertainer = this.entertainers[this.index];
     		this.photoPreviewSrc = this.entertainer.photos[0].preview;
     }
  }

  goToEntertainerByIndex(direction) {
  	let possibleIndex = this.index + direction;
  	if (possibleIndex >= 0 && possibleIndex < this.entertainers.length) {
	  	this.index = possibleIndex;
  		this.entertainer = this.entertainers[this.index];
      this.photoPreviewSrc = this.entertainer.photos[0].preview;
  	}
  }

  setPhotoPreview(src) {
  	this.photoPreviewSrc = src;
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
          photos: this.entertainer.photos,
          photoIndexActive: _.findIndex(this.entertainer.photos, {original: this.photoPreviewSrc})
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
