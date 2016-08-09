import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';
import User from '../../services/user/user';
import Constants from '../../services/constant/constants';

let navbarModule = angular.module('navbar', [
  uiRouter,
  User,
  Constants
])

.component('navbar', navbarComponent)

.name;

export default navbarModule;
