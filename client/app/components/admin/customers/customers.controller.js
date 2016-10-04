class CustomersController {

  constructor (CustomersService, Constants) {
    'ngInject';

    _.assign(this, {
    	CustomersService,
      Constants,
    	list: [],
    	isOnProgress: false,
      isLastPage: false,
      currentPage: 1,
      statuses: Constants.admin.statuses.customer
    });
  }

  $onInit () {
  	this.isOnProgress = true;
    this.CustomersService.fetchCustomers()
      .then(data => {
      	this.isOnProgress = false;
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
        return this.list = data.items;
      });
  }

  fetchMoreItems () {
    this.isOnProgress = true;

    this.CustomersService.fetchCustomers(this.currentPage + 1)
      .then((data) => {
        this.isOnProgress = false;
        this.currentPage = data.meta.pagination.current_page;
        this.list = this.list.concat( data.items );
        this.isLastPage = this.checkIsLastPage(data.meta.pagination.total_pages);
      });
  };

  checkIsLastPage (totalPages) {
		return this.currentPage == totalPages;
  }
}

export default CustomersController;
