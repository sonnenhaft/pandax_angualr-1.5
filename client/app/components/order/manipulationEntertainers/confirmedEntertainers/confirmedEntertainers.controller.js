class confirmedEntertainersController {

  constructor (OrderService, Constants) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
     		Constants
     	});
  }

}

export default confirmedEntertainersController;
