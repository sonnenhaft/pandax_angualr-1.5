import EntertainerRatingResource from './entertainer-rating.resource';
import template from './view-entertainer-ratings.modal.html';

import AbstractScrollableController from '../../../../../common/abstract-scrollable.controller';

class controller extends AbstractScrollableController {
  constructor ($mdDialog, EntertainerRatingResource) {
    'ngInject';

    super( );
    Object.assign(this, { $mdDialog, EntertainerRatingResource });
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
