import Resolve from '../common-services/resolve.service';
import template from './main-page.layout.html';

export default angular.module('mainPageLayout', [
  Resolve
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main', {
    url: '/main',
    abstract: true,
    component: 'mainPageLayout',
    resolve: {
      providers: Resolve => {
        'ngInject';

        return Resolve.providers( );
      }
    }
  });
}).component('mainPageLayout', {
  template,
  controller (StatefulUserData) {
    'ngInject';

    this.StatefulUserData = StatefulUserData;
  }
}).name;
