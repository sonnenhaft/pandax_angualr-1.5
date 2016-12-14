import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';
import User from '../../services/user/user';
import Constants from '../../services/constant/constants';
import activeMenuItem from '../active-menu-item.directive';

let navbarModule = angular.module('navbar', [
  uiRouter,
  User,
  Constants,
  activeMenuItem
])

.component('navbar', navbarComponent)

.name;

export default navbarModule;
