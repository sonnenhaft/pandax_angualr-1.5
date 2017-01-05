import EntertainerRatingResource from './entertainer-rating.resource';
import template from './view-entertainer-ratings.modal.html';

class AbstractScrollableController {
  currentPage = 0
  list = []

  isEmpty = false
  isLastPage = false

  fetchMoreItems ( ) {
    if (this.isLastPage) { return; }
    this.isOnProgress = true;
    this.currentPage += 1;
    return this._next( ).$promise.then(({ items: list, meta: pagination }) => {
      this.list = this.list.concat(list);
      this.currentPage = pagination.current_page;
      this.isLastPage = this.currentPage === pagination.total_pages;
      this.isEmpty = !this.list.length;
      this.isOnProgress = false;
    });
  }
}

class controller extends AbstractScrollableController {
  constructor ($mdDialog, EntertainerRatingResource) {
    'ngInject';

    super( );
    Object.assign(this, { $mdDialog, EntertainerRatingResource });
  }

  $onInit ( ) {
    this.fetchMoreItems( );
  }

  _next ( ) {
    const page = this.currentPage;
    const provider_id = this.userId; // eslint-disable-line camelcase
    return this.EntertainerRatingResource.fetchRatings({ provider_id });
  }
}


export default angular.module('ratingsModalComponent', [
  EntertainerRatingResource
]).component('ratingsModalComponent', {
  bindings: { userId: '<' },
  template,
  controller
}).name;
