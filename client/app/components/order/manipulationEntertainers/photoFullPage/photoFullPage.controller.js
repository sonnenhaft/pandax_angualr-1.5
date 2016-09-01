class photoFullPageController {

  constructor ($state, $mdDialog, $scope) {
     'ngInject';

     _.assign(this, {
        $state,
        $mdDialog,
        $scope,
        len: 0
     	});

    this.len = this.photos.length;

/*
  For future: add handlers for arrow keyup event
    document.addEventListener("keyup", this.keyEventHandler.bind(this, true), false);

    this.$scope.$on("$destroy", (_e) => {
      document.removeEventListener("keyup", this.keyEventHandler);    // not working. Look at best way
    });
*/

  }

  goToPhotoByIndex(direction/*, byKeyboard = false*/) {
    let possibleIndex = this.photoIndexActive + direction;
  	if (possibleIndex >= 0 && possibleIndex < this.len) {
	  	this.photoIndexActive = possibleIndex;
/*      if (byKeyboard) {       //  angular doesn't update value in the scope after keypress
        this.$scope.$apply();
      }*/
  	}
  }

/*  keyEventHandler (byKeyboard = false, e) {
    switch(e.which) {
        case 37:              // left arrow
            this.goToPhotoByIndex(-1, byKeyboard);
            break;
        case 40:              // bottom arrow
            this.goToPhotoByIndex(-1, byKeyboard);
            break;
        case 38:               // top arrow
            this.goToPhotoByIndex(+1, byKeyboard);
            break;
        case 39:               // right arrow
            this.goToPhotoByIndex(+1, byKeyboard);
            break;
    }
  }*/
}

export default photoFullPageController;
