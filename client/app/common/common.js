import angular from 'angular';
import Navbar from './navbar/navbar';
import Map from './map/map';

let commonModule = angular.module('app.common', [
  Navbar,
  Map
])

.name;

export default commonModule;
