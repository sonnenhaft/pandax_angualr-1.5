import config from 'config';
import pandaxTermsComponent from './pandax-terms.component/pandax-terms.component';

import template from './accept-terms-and-conditions.page.html';

class controller {
  constructor (User, Request, $state) {
    'ngInject';

    Object.assign(this, { User, Request, $state });
  }

  onAccept ( ) {
    if (!this.accepted) { return; }
    this.orderLoading = true;
    this.Request.post(`${config.API_URL}/api/order`, this.order).then(({ data, status }) => {
      if (status !== 200) { return; }
      this.User.update(data.customer);
      this.$state.go('main.manipulationEntertainers', { orderId: data.id, channelName: data.channel_name });
    }
    ).finally(( ) => { this.orderLoading = false; });
  }

}

const name = 'acceptTermsAndConditionsPage';
export default angular.module(name, [
  pandaxTermsComponent
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state(`main.${name}`, {
    url: '/accept-terms-and-conditions',
    params: { order: {} },
    parent: 'main',
    controller: (order, $scope) => { $scope.order = order; },
    template: '<accept-terms-and-conditions-page order="order"></accept-terms-and-conditions-page>',
    resolve: {
      order: $stateParams => {
        'ngInject';

        return $stateParams.order;
      }
    }
  }).state('pandaxTermsPageComponent', {
    url: '/terms-and-conditions',
    template: '<div style="padding: 16px"><pandax-terms-page-component></pandax-terms-page-component></div>'
  });
}).component(name, {
  bindings: { order: '<' },
  template,
  controller
}).name;
