class orderController {

  constructor (Constants, moment, $state, OrderService, Helper) {
    'ngInject';

    _.assign(this, {
    	Constants,
    	moment,
    	$state,
    	OrderService,
    	Helper,
      timeToCleanCancel: Constants.order.timeToCleanCancel
    });
  }

  cancelOrder (ev, invite) {  	
    this.OrderService.cancelOrderForEntertainer(ev, invite).then((_data) => {
			 this.Helper.showToast('Done');
    });
  }

}

export default orderController;
