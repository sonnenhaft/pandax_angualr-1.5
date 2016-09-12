class confirmedEntertainersController {

  constructor (OrderService, Constants, CancelOrderForEntertainer) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
     		Constants,
     		CancelOrderForEntertainer
     	});
console.log('this:', this.cancelOrderForEntertainer);
  }

}

export default confirmedEntertainersController;
