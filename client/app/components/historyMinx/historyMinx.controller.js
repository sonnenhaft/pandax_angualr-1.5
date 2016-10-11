export default class historyMinxController {

  constructor ($stateParams, Constants, moment, OrderService, Helper) {
    'ngInject';

    _.assign(this, {
    	$stateParams,
    	Constants,
    	moment,
      OrderService,
      Helper,
      timeToCleanCancel: Constants.order.timeToCleanCancel
    });

    this.type = $stateParams.type;
  }

  cancelOrder (ev, invite) {  	
    let cost = this.moment(invite.datetime).add(this.timeToCleanCancel, 'm') > this.moment() ? 0 : invite.type.penalty_amount;

    this.OrderService.cancelOrderForEntertainer(ev, invite, cost).then((_data) => {
			 this.Helper.showToast('Done');
    });
  }
}
