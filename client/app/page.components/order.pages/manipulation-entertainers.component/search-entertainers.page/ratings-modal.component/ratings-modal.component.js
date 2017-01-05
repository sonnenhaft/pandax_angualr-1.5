import ProviderRatingResource from './rating.resource';
import template from './ratings-modal.html';

class AbstractScrollableController {
  currentPage = 0
  list = []

  isEmpty = false

  fetchMoreItems ( ) {
    this.isOnProgress = true;
    console.log('hoho')
    this.currentPage += 1;
    return this._next( ).$promise.then(({items: list, meta: pagination}) => {
      this.isOnProgress = false;
      this.currentPage = pagination.current_page;
      this.list = this.list.concat(list);
      this.isEmpty = !!this.list.length
      if (this.currentPage === pagination.total_pages) {
        this.isLastPage = true;
      }
    });
  }
}

class controller extends AbstractScrollableController {
  constructor ($mdDialog, ProviderRatingResource) {
    'ngInject';

    super( );
    Object.assign(this, { $mdDialog, ProviderRatingResource });
  }

  $onInit ( ) {
    this.fetchMoreItems( );
  }

  _next ( ) {
    const page = this.currentPage;
    const provider_id = this.userId; // eslint-disable-line camelcase
    return this.ProviderRatingResource.fetchRatings({ provider_id });
  }
}


export default angular.module('ratingsModalComponent', [
  ProviderRatingResource
]).component('ratingsModalComponent', {
  bindings: { userId: '<' },
  template,
  controller
}).name;
