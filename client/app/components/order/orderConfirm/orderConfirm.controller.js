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
    let cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment() ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer(ev, invite, cost).then((_data) => {
			 this.Helper.showToast('Done');
    });
  }

}

export default orderController;
