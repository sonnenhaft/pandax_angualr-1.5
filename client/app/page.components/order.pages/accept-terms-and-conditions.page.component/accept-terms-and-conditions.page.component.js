import angular from 'angular';
import uiRouter from 'angular-ui-router';

import pandaxTermsComponent from './pandax-terms.component/pandax-terms.component';

import template from './accept-terms-and-conditions.page.html';

class controller {
  constructor (Constants, User, Request, $state) {
    'ngInject';

    Object.assign(this, { Constants, User, Request, $state });
  }

  onAccept ( ) {
    if (!this.accepted) { return; }
    this.orderLoading = true;
    this.Request.send(
            this.User.token( ),
            this.Constants.api.order.method,
            this.Constants.api.order.uri,
            this.order
        ).then(result => {
          if (result.status == 200) {
            this.User.update(result.data.customer);
            this.$state.go('main.manipulationEntertainers', { orderId: result.data.id, channelName: result.data.channel_name });
          }
        }
        ).finally(( ) => { this.orderLoading = false; });
  }

}


const name = 'acceptTermsAndConditionsPage';
export default angular.module(name, [
  uiRouter,
  pandaxTermsComponent
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state(`main.${name}`, {
    url: '/accept-terms-and-conditions',
    params: { order: {} },
    parent: 'main',
    controller: (order, $scope) => { $scope.order = order; },
    template: '<accept-terms-and-conditions-page order="order"></accept-terms-and-conditions-page>',
    resolve: { order: $stateParams => $stateParams.order }
  });
}).component(name, {
  bindings: { order: '<' },
  template,
  controller
}).name;
