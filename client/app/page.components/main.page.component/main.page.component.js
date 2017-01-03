import Resolve from '../../common-services/resolve.service';
import template from './main.page.html';

export default angular.module('main', [
  Resolve
]).config($stateProvider => {
  'ngInject';

  $stateProvider.state('main', {
    url: '/main',
    abstract: true,
    component: 'main',
    resolve: {
      providers: Resolve => {
        'ngInject';

        return Resolve.providers( );
      }
    }
  });
}).component('main', {
  template,
  controller (User) {
    'ngInject';

    this.User = User;
    this.userAvatarSrc = '';
    this.User.fetchUserAvatarSrc( );
  }
}).name;
