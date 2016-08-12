class searchEntertainersController {

  constructor (OrderService) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
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
  	}
  }

  setPhotoPreview(src) {
  	this.photoPreviewSrc = src;
  }



}

export default searchEntertainersController;
