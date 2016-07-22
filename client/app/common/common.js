import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import Constants from './constants/constants';

let commonModule = angular.module('app.common', [
  Navbar,
  User,
  Constants
])
  
.name;

export default commonModule;
