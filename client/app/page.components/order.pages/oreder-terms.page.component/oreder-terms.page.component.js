import angular from 'angular';
import template from './oreder-terms.page.html';

import uiRouter from 'angular-ui-router';

class controller {
  constructor(Constants, User, Request, $state) {
    'ngInject';

    Object.assign(this, {
      Constants,
      User,
      Request,
      $state
    });
  }

  onAccept() {
    if (this.accepted) {
      this.orderLoading = true;
      this.Request
        .send(
          this.User.token(),
          this.Constants.api.order.method,
          this.Constants.api.order.uri,
          this.order
        )
        .then(
          result => {
            if (result.status == 200) {
              this.User.update(result.data.customer);
              this.$state.go('main.manipulationEntertainers', {orderId: result.data.id, channelName: result.data.channel_name});
            }
          }
        )
        .finally((_data) => {
          this.orderLoading = false;
        });
    }
  }

}


export default angular.module('orderTerms', [
  uiRouter
]).config($stateProvider => {
  "ngInject";

  $stateProvider.state('main.accept', {
    url: '/order/accept-terms',
    params: {
      order: {}
    },
    parent: 'main',
    controller: (order, $scope) => {
      $scope.order = order;
    },
    template: '<order-terms order="order"></order-terms>',
    resolve: {
      order: $stateParams => {
        return $stateParams.order;
      }
    }
  });
}).component('orderTerms', {
  bindings: {
    order: '<'
  },
  template,
  controller
}).name;
