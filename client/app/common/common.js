import angular from 'angular';
import Navbar from './navbar/navbar';
import Map from './map/map';
import profileFields from './profileFields/profile.fields';

let commonModule = angular.module('app.common', [
  Navbar,
  Map,
  profileFields
])

.name;

export default commonModule;
