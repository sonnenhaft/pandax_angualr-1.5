import angular from 'angular';
import User from '../../../services/user/user';
import Constants from '../../../services/constant/constants';
import activeMenuItem from '../../../common/active-menu-item.directive';

import template from './navbar-admin.html';
import './navbar-admin.scss';

class controller {
  constructor(User, Constants, $state) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      $state,
      collapsed: true
    });

    // this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf(User.get('role')) >= 0);
    this.navigation = _.filter(Constants.user.navigation, navItem => navItem.role.indexOf('admin') >= 0);

  }
}


export default angular.module('navbarAdmin', [
  User,
  Constants,
  activeMenuItem
]).filter('navByPosition', function navByPosition() {
  return function(navs, field, val) {
    return _.filter(navs, item => item[field] == val);
  };
}).component('navbarAdmin', {
  template,
  controller,
}).name;
