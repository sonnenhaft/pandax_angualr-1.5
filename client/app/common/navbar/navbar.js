import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';
import Storage from '../../services/storage/storage';
import Constants from '../../services/constant/constants';

let navbarModule = angular.module('navbar', [
  uiRouter,
  Storage,
  Constants
])

.component('navbar', navbarComponent)

.name;

export default navbarModule;
