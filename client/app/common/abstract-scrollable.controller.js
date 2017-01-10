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

  _next ( ) {
    throw new Error('you should implement _next method');
  }

  fetchMoreItems ( ) {
    if (this.isLastPage) { return; }

    this.isOnProgress = true;
    this.currentPage += 1;
    return this._next( ).$promise.then(
      ({ items, meta: { current_page: currentPage, total_pages: totalPages } }) => {
        const list = [...this.list, ...items];
        const isLastPage = currentPage === totalPages;
        const isEmpty = !this.list.length;

        Object.assign(this, { list, currentPage, isLastPage, isEmpty });
      },
      e => {
        console.log(e);
        this.isLastPage = true;
      }
    ).finally(( ) => {
      this.isOnProgress = false;
    });
  }
}
