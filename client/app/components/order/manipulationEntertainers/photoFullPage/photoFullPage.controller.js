class photoFullPageController {

  constructor ($state, $mdDialog) {
     'ngInject';

     _.assign(this, {
        $state,
        $mdDialog,
        len: 0
     	});
     this.len = this.photos.length;
  }

  goToPhotoByIndex(direction) {
  	let possibleIndex = this.photoIndexActive + direction;
  	if (possibleIndex >= 0 && possibleIndex < this.len) {
	  	this.photoIndexActive = possibleIndex;
  	}
  }
}

export default photoFullPageController;
