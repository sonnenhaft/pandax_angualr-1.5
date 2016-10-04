export default class pastOrdersProviderController {

  constructor (OrderService, Constants) {
    'ngInject';

    _.assign(this, {
    	OrderService,
      Constants,
    	history: [],
      isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
    });

    this.OrderService.fetchProviderPastOrders()
    	.then(data => this.history = data.items);
  }

  fetchMoreItems () {
    this.isOnProgress = true;

    this.OrderService.fetchProviderPastOrders(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.history = this.history.concat( data.items );

        if (this.currentPage == data.meta.pagination.total_pages) {
          this.isLastPage = true;
        }
      })
  };

}
