import photoFullPageTpl from '../../order/manipulationEntertainers/photoFullPage/photoFullPage.html';
import photoFullPageCtrl from '../../order/manipulationEntertainers/photoFullPage/photoFullPage.controller.js';

class EntertainersController {

  constructor (EntertainersService, Constants, $mdDialog) {
    'ngInject';

    _.assign(this, {
    	EntertainersService,
      Constants,
      $mdDialog,
    	list: [],
    	isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
      statuses: Constants.admin.statuses.entertainer
    });
  }

  $onInit () {
  	this.isOnProgress = true;
    this.EntertainersService.fetchEntertainers()
      .then(data => {
      	this.isOnProgress = false;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
        return this.list = data.items;
      });
  }

  fetchMoreItems () {
    this.isOnProgress = true;

    this.EntertainersService.fetchEntertainers(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.list = this.list.concat( data.items );
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      });
  };

  checkIsLastPage (totalPages) {
		return this.currentPage == totalPages;
  }


  showPopup(ev, index) {
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
          photos: this.list[index].photos,
          photoIndexActive: 0
        }
      });
  }  
}

export default EntertainersController;
