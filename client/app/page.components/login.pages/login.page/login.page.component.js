import template from './login.page.html';

export default angular.module('loginPage', []).component('loginPage', {
  template,
  controller (LoginResource, $stateParams, $location, Storage, User) {
    'ngInject';

    console.log($location.hash( ));
    this.login = ( ) => LoginResource.login({}, this.credentials).$promise.then(({ data, token }) => {
      // TODO: refactor this
      const user = Object.assign(data, { auth: data.first_name && data.last_name, token });
      const role = user.role = user.role === 'client' ? 'customer' : user.role;
      Storage.setObject('MINX', { token, user });
      return User.getUserProfile(user, role);
    }).then(user => {
      if ($stateParams.redirectUrl) {
        $location.search({});
        $location.replace( );
        $location.path($stateParams.redirectUrl);
      } else if (user.role === 'customer') {
        this.$state.go('main.order');
      } else if (user.role === 'admin') {
        this.$state.go('admin.entertainers');
      } else if (!user.first_name || user.last_name) {
        this.$state.go('main.profile.create');
      } else {
        this.$state.go('main.profile.view');
      }
    });
  }
}).name;

