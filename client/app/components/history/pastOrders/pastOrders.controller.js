export default class pastOrdersController {

  constructor (OrderService, Constants) {
    'ngInject';

    _.assign(this, {
    	OrderService,
    	history: [],
      isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
      statuses: Constants.order.statuses
    });
  }

  $onInit () {
  	this.isOnProgress = true;

    this.OrderService.fetchHistoryOrders()
      .then(data => {
      	this.isOnProgress = false;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
        return this.history = data.items;
      });
  }

  fetchMoreItems () {
    this.isOnProgress = true;

    this.OrderService.fetchHistoryOrders(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.history = this.history.concat( data.items );

        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      })
  };

  checkIsLastPage (totalPages) {
		return this.currentPage == totalPages;
  }

}
