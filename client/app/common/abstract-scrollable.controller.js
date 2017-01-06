export default class AbstractScrollableController {
  constructor ( ) {
    this.resetItems( );
  }

  resetItems ( ) {
    this.currentPage = 0;
    this.list = [];

    this.isEmpty = false;
    this.isLastPage = false;
  }

  $onInit ( ) {
    this.fetchMoreItems( );
  }

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
