class confirmedEntertainersController {

  constructor (OrderService, Constants, Helper) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
     		Constants,
     		Helper
     	});
  }

  cancelOrder (ev, entertainer) {  	
    this.OrderService.cancelOrderForEntertainer(ev, entertainer).then((_data) => {
			 this.Helper.showToast('Done');
    });
  }

}

export default confirmedEntertainersController;
