class confirmedEntertainersController {

  constructor (OrderService, Constants, Helper, moment, $scope, $state, $stateParams) {
     'ngInject';

     _.assign(this, {
     		OrderService, 
     		Constants,
     		Helper,
        moment,
        $scope,
        $state,
        $stateParams
     	});

      this.$scope.$watch(() => this.entertainers, (newValue, oldValue) => {
        if (newValue.filter((item) => item.status == this.Constants.order.statuses.accepted).length == this.countOfRequiredEntertainers) {
          this.$state.go('main.orderConfirm', {orderId: this.$stateParams.orderId});
        }
      }, true);
  }


  cancelOrder (ev, invite, dirtyCanceling = true) {  	
    this.OrderService.cancelOrderForEntertainer(ev, invite, dirtyCanceling == true ? this.serviceTypePrice : 0).then((_data) => {
			 this.Helper.showToast('Done');
    });
  }

}

export default confirmedEntertainersController;
