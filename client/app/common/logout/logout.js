import angular from 'angular';
import logoutComponent from './logout.component';
import User from '../../services/user.service';

export default angular
  .module('logout', [
    User
  ])
  .component('logout', logoutComponent)
  .name;
