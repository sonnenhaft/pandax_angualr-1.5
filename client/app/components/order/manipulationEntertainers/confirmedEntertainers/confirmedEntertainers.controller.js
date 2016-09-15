class confirmedEntertainersController {

  constructor (OrderService, Constants, Helper, moment) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
     		Constants,
     		Helper,
        moment
     	});
  }

  cancelOrder (ev, invite) {  	
    this.OrderService.cancelOrderForEntertainer(ev, invite, this.serviceTypePrice).then((_data) => {
			 this.Helper.showToast('Done');
    });
  }

}

export default confirmedEntertainersController;
