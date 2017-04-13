import template from './hidden-entertainer.page.html';
import './hidden-entertainer.page.scss';

class controller {
  constructor ($http, StatefulUserData, $stateParams) {
    'ngInject';

    this.user = StatefulUserData.getUser( );
    this._setNextStatus( );
    this.statusUrl = '/api/provider/profile/status';
    Object.assign(this, { $http, StatefulUserData, $stateParams });
  }

  $onInit ( ) {
    if (!this.isActive && this.$stateParams.action === 'setActive') {
      this.setStatus( );
    }
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

    this.isSwitchingStatus = true;
    this.$http.put(`{{config_api_url}}${this.statusUrl}`, {
      status: this.nextStatus,
      coordinates: { latitude, longitude },
      service_types: ['1', '2', '3']
    }).then(({ data }) => {
      this.StatefulUserData.extend(data);
      this._setNextStatus( );
      this.isSwitchingStatus = false;
    });
  }
}

const component = 'hiddenEntertainer';
export default angular.module(component, [
  'ngMaterial'
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
