import pandaxTermsComponent from './pandax-terms.component/pandax-terms.component';

import template from './accept-terms-and-conditions.page.html';

class controller {
  constructor ($http, $state, StatefulUserData, $stateParams) {
    'ngInject';

    Object.assign(this, { $http, $state, StatefulUserData, $stateParams });
    this.cameFromOderPage = !angular.equals(this.$stateParams.order || {}, {})
  }

  createOrderAndRedirectToManipulation ( ) {
    this.isLoading = true;
    this.$http.post('{{config_api_url}}/api/order', this.$stateParams.order).then(
      ({ data: { customer: currentUser, id: orderId, channel_name: channelName } }) => {
        this.StatefulUserData.extend(currentUser);
        this.$state.go('main.manipulationEntertainers', { orderId, channelName });
      },
      ( ) => { this.isLoading = false; }
    );
  }
}

const name = 'acceptTermsAndConditionsPage';
export default angular.module(name, [
  pandaxTermsComponent
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/accept-terms-and-conditions',
    parent: 'main',
    name,
    component: name,
    params: { order: {} },
  }).state('pandaxTermsPageComponent', {
    url: '/terms-and-conditions',
    template: '<div style="padding: 16px"><pandax-terms-page-component></pandax-terms-page-component></div>'
  });
}).component(name, {
  template,
  controller
}).name;
