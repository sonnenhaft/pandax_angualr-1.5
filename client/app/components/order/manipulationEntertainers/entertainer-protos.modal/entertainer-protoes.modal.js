import template from './entertainer-protos.modal.html'

class controller {
  constructor($state, $mdDialog, $scope, $mdMedia) {
    'ngInject';

    _.assign(this, {
      $state,
      $mdDialog,
      $scope,
      $mdMedia,
      len: 0,
      imageStyles: {}
    });

    this.len = this.photos.length;
    this.setImageStyles()

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

  setImageStyles() {
    if (this.$mdMedia('gt-sm')) {   // desktop
      this.imageStyles = {
        'max-height': (window.innerHeight * 80 / 100) + 'px',
        'max-width': (window.innerWidth * 80 / 100) + 'px'
      }
    }
  }
}

export default angular.module('entertainerPhotosModal', [
]).factory('entertainerPhotosModal', $mdDialog => (locals, targetEvent) => $mdDialog.show({
  targetEvent,
  controller,
  locals,
  template: '<div layout="row" layout-align="end" class="icon_modal-close">\
                    <div class="icon_modal-close__image" ng-click="$ctrl.$mdDialog.hide()"></div>\
                  </div>' +
  template,
  controllerAs: '$ctrl',
  clickOutsideToClose: true,
  bindToController: true
})).name
