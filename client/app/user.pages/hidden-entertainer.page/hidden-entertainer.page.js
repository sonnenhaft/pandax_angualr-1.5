import template from './hidden-entertainer.page.html';
import PandaButton from './panda-button/panda-button.component';
import './hidden-entertainer.page.scss';

class controller {
  constructor ($http, StatefulUserData, $stateParams, $httpParamSerializerJQLike) {
    'ngInject';

    this.user = StatefulUserData.getUser( );
    this._setNextStatus( );
    this.statusUrl = '/api/provider/profile/status';
    this.invitesUrl = '/api/provider/orders/invites';
    Object.assign(this, { $http, StatefulUserData, $stateParams, $httpParamSerializerJQLike });
  }

  acceptOrder (order) {
    order.$isUpading = true;
    this.$http.post(`{{config_api_url}}/api/orders/${order.id}/invite`, {
      action: 'confirm'
    }).then(
      ( ) => this.fetchInvites( ),
      ( ) => order.$isUpading = false
    );
  }

  $onInit ( ) {
    if (!this.isActive && this.$stateParams.action === 'setActive') {
      this.setStatus( );
    }
    this.fetchInvites( );
  }

  fetchInvites ( ) {
    return this.$http({
      url: `{{config_api_url}}${this.invitesUrl}`,
      method: 'GET',
      params: {
        page: 1,
        // status: ['invited', 'missed']
      },
      paramSerializer: params => this.$httpParamSerializerJQLike(params).replace('%5B%5D', '[]')
    }).then(({ data: { items } }) => {
      this.availableInvites = items;
    });
  }

  _setNextStatus ( ) {
    this.isActive = this.user.status === 'active';
    this.nextStatus = this.isActive ? 'offline' : 'active';
  }

  setStatus ( ) {
    const {
      latitude = '53.910475299999995',
      longitude = '27.515926'
    } = this;

    this.$isUpading = true;
    this.$http.put(`{{config_api_url}}${this.statusUrl}`, {
      status: this.nextStatus,
      coordinates: { latitude, longitude },
      service_types: ['1', '2', '3']
    }).then(({ data }) => {
      this.StatefulUserData.extend(data);
      this._setNextStatus( );
      this.$isUpading = false;
    });
  }
}

const component = 'hiddenEntertainer';
export default angular.module(component, [
  PandaButton
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state({
    url: '/hidden-entertainer-actions',
    parent: 'main',
    name: component,
    component
  });
  $stateProvider.state({
    url: '/hidden-entertainer-actions/:action',
    parent: 'main',
    name: `${component}action`,
    component
  });
}).component(component, {
  template,
  controller
}).name;
