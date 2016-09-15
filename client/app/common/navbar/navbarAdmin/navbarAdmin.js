import angular from 'angular';
import navbarAdminComponent from './navbarAdmin.component';
import User from '../../../services/user/user';
import Constants from '../../../services/constant/constants';
import activeMenuItem from '../../../directives/activeMenuItem/activeMenuItem';

let navbarAdminModule = angular.module('navbarAdmin', [
  User,
  Constants,
  activeMenuItem
])

.component('navbarAdmin', navbarAdminComponent)

.name;

export default navbarAdminModule;
