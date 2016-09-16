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

  cancelOrder (ev, invite, dirtyCanceling = true) {  	
    this.OrderService.cancelOrderForEntertainer(ev, invite, dirtyCanceling == true ? this.serviceTypePrice : 0).then((_data) => {
			 this.Helper.showToast('Done');
    });
  }

}

export default confirmedEntertainersController;
