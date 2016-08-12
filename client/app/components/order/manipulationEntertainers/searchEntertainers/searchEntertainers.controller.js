import photoFullPageTpl from '../photoFullPage/photoFullPage.html';
import photoFullPageCtrl from '../photoFullPage/photoFullPage.controller.js';

class searchEntertainersController {

  constructor (OrderService, $state, $mdDialog, $mdMedia) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
        $state,
        $mdDialog,
        $mdMedia,
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
     		this.photoPreviewSrc = this.entertainer.photo_small[0];
     }
  }

  goToEntertainerByIndex(direction) {
  	let possibleIndex = this.index + direction;
  	if (possibleIndex >= 0 && possibleIndex < this.entertainers.length) {
	  	this.index = possibleIndex;
  		this.entertainer = this.entertainers[this.index];
      this.photoPreviewSrc = this.entertainer.photo_small[0];
  	}
  }

  setPhotoPreview(src) {
  	this.photoPreviewSrc = src;
  }

  showPopup(ev) {
    this.$mdDialog.show({
        controller: photoFullPageCtrl,
        controllerAs: 'vm',
        template: '<div layout="row" layout-align="end" class="icon_modal-close">\
                    <div class="icon_modal-close__image" ng-click="vm.$mdDialog.hide()"></div>\
                  </div>' + 
                  photoFullPageTpl,
        targetEvent: ev,
        bindToController: true,
        locals: {
          photos: this.entertainer.photo_small,
          photoIndexActive: this.entertainer.photo_small.indexOf(this.photoPreviewSrc)
        }
      });
  }


}

export default searchEntertainersController;
