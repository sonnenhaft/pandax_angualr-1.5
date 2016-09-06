class confirmedEntertainersController {

  constructor (OrderService, WebSocket) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
     		WebSocket,
     		entertainer: null
     	});
  }

  $onInit () {
  	/*
  		ToDo: add handler for events from server
  	 */
  	// this.WebSocket.invites();
  }

}

export default confirmedEntertainersController;
