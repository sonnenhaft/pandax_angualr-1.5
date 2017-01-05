import pandaxTermsComponent from './pandax-terms.component/pandax-terms.component';

import template from './accept-terms-and-conditions.page.html';

class controller {
  constructor ($http, $state, StatefulUserData) {
    'ngInject';

    Object.assign(this, { $http, $state, StatefulUserData });
  }

  onAccept ( ) {
    if (!this.accepted) { return; }
    this.orderLoading = true;
    this.$http.post('{{config_api_url}}/api/order', this.order).then(({ data, status }) => {
      if (status !== 200) { return; }
      this.StatefulUserData.extend(data.customer);
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
