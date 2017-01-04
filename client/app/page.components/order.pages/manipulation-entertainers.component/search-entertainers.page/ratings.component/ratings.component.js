import template from './ratings.html';
import './ratings.scss';

class controller {
  history = []
  isOnProgress = true
  isLastPage = false
  currentPage = 1
  list = []

  constructor (OrderService, $mdDialog) {
    'ngInject';

    Object.assign(this, { OrderService, $mdDialog });

    this.fetchMoreItems( );
  }

  fetchMoreItems ( ) {
    this.isOnProgress = true;

    this.OrderService.getRatingsOfEntertainers(this.userId).then(({ meta: { pagination }, items }) => {
      this.isOnProgress = false;
      this.currentPage = pagination.current_page;
      this.list = this.list.concat(items);

      if (this.currentPage == pagination.total_pages) {
        this.isLastPage = true;
      }

      return this.list;
    });
  }
}


export default angular.module('ratings', []).component('ratings', {
  bindings: { userId: '<' },
  template,
  controller
}).name;
