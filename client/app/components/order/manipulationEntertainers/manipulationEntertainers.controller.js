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
console.log('mic:', this.entertainersInvited, this.OrderService.listConfirmed);

    this.OrderService.cancelOrder(ev, this.$stateParams.orderId)
      .then((_data) => {
console.log('done', _data);
        /*
          ToDo: go to the correct page
          //this.$state.go();
         */
      });
  }
}

export default manipulationEntertainersController;
