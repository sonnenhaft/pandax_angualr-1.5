class OrdersController {

  constructor (OrdersService, Constants) {
    'ngInject';

    _.assign(this, {
    	OrdersService,
      Constants,
    	isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
      statuses: Constants.order.statuses,
      activeOrderIndex: 0
    });
  }

  $onInit () {
  	this.isOnProgress = true;
    this.OrdersService.fetchOrders()
      .then(data => {
      	this.isOnProgress = false;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      });
  }

  fetchMoreItems () {
    this.isOnProgress = true;

    this.OrdersService.fetchOrders(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      });
  };

  checkIsLastPage (totalPages) {
		return this.currentPage == totalPages;
  }

}

export default OrdersController;
