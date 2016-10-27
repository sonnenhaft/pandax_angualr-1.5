class manipulationEntertainersController {

  constructor ($state, $mdMedia, $stateParams, OrderService, Constants) {
     'ngInject';

     _.assign(this, {
        $state,
        $mdMedia,
        $stateParams,
        OrderService,
        Constants,
        showComponentOnly: '',
        itemActiveIndex: 0
     });
  }

  cancelOrder (ev) {
    let messageType = 0;

    if (this.OrderService.listConfirmed.length > 0) {
      messageType = 2;
    } else if (this.OrderService.listInvited.length > 0) {
      messageType = 1;
    }

    this.OrderService.cancelOrder(ev, this.$stateParams.orderId, messageType)
      .then((data) => {
        if (data.status == this.Constants.order.statuses.accepted) {
          this.$state.go('main.orderConfirm', {orderId: this.$stateParams.orderId});
        } else {
          this.$state.go('main.order');
        }
      });
  }
}

export default manipulationEntertainersController;
