import angular from 'angular';
import uiRouter from 'angular-ui-router';
import OrderService from '../../../../common-services/orderService.service';
import WebSocket from '../../../../common-services/WebSocket.service';
import timer from '../../../../common/timer.directive';
import byStatuses from './byStatuses.filter';
import showInTime from '../../../../common/show-in-time.directive';
import template from './confirmed-entertainers.page.html';

class controller {

  constructor (OrderService, Constants, Helper, moment, $scope, $state, $stateParams) {
     'ngInject';

     Object.assign(this, {
     		OrderService,
     		Helper,
        moment,
        $scope,
        $state,
        $stateParams,
        statuses: Constants.order.statuses
     	});

      this.$scope.$watch(() => this.entertainers, (newValue, oldValue) => {
        if (newValue.filter(
              (item) => {
                return item.status &&
                  ([this.statuses.accepted, this.statuses.canceledbyCustomer, this.statuses.canceledbyProvider].indexOf(item.status) >= 0);
              }).length == this.countOfRequiredEntertainers) {
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

export default angular.module('confirmedEntertainers', [
  uiRouter,
  OrderService,
  WebSocket,
  timer,
  showInTime
]).filter('byStatuses', byStatuses).component('confirmedEntertainers', {
  bindings: {
    entertainers: '=',
    countOfRequiredEntertainers: '<',
    serviceTypePrice: '<'
  },
  template,
  controller
}).name;
