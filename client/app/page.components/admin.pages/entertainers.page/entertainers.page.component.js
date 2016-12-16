import angular from 'angular';
import uiRouter from 'angular-ui-router';

import entertainerPhotosModal from '../../order.pages/manipulationEntertainers/entertainer-protos.modal/entertainer-protoes.modal.js';
import EntertainersService from '../../../common-services/entertainersService.service';

import template from './entertainers.page.html';

class controller {
  constructor(EntertainersService, Constants, $mdDialog, entertainerPhotosModal, $window) {
    'ngInject';

    Object.assign(this, {
      EntertainersService,
      entertainerPhotosModal,
      Constants,
      // so we expect that in required 'admin' component there is #admin div, sorry for this
      $scrollableElement: angular.element($window.document.getElementById('admin')),
      $mdDialog,
      isOnProgress: false,
      isLastPage: false,
      currentPage: 0,
      statuses: Constants.admin.statuses.entertainer
    });
  }

  $onInit() {
    this.fetchMoreItems()
  }

  fetchMoreItems() {
    this.isOnProgress = true;

    this.EntertainersService.fetchEntertainers(this.currentPage + 1).then((data) => {
      this.isOnProgress = false;
      this.currentPage = data.meta.pagination.current_page;
      this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
    });
  };

  checkIsLastPage(totalPages) {
    return this.currentPage == totalPages;
  }

  showPopup(ev, index) {
    this.entertainerPhotosModal({
      photos: this.EntertainersService.list[index].photos,
      photoIndexActive: 0
    }, ev)
  }
}

var name = 'entertainersPage';
export default angular.module(name, [
  uiRouter,
  EntertainersService,
  entertainerPhotosModal
]).config(($stateProvider) => {
  "ngInject";

  $stateProvider.state('admin.entertainers', {
    url: '/entertainers',
    parent: 'admin',
    component: name
  });
}).component(name, {
  require: 'admin',
  template,
  controller
}).name;
