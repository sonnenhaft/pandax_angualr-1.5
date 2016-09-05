class confirmedEntertainersController {

  constructor (OrderService) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
     		entertainer: null
     	});
  }

}

export default confirmedEntertainersController;
