import angular from 'angular';
import logoutComponent from './logout.component';
import User from '../../services/user/user';

export default angular
  .module('logout', [
    User
  ])
  .component('logout', logoutComponent)
  .name;
