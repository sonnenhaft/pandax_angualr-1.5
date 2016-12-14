import angular from 'angular';
import navbarAdminComponent from './navbarAdmin.component';
import User from '../../../services/user/user';
import Constants from '../../../services/constant/constants';
import activeMenuItem from '../../active-menu-item.directive';
import navByPosition from './navByPosition.filter';

let navbarAdminModule = angular.module('navbarAdmin', [
  User,
  Constants,
  activeMenuItem
])

.filter('navByPosition', navByPosition)

.component('navbarAdmin', navbarAdminComponent)

.name;

export default navbarAdminModule;
