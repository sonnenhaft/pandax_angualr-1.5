import angular from 'angular';
import Navbar from './navbar/navbar';
import Map from './map/map';
import profileFields from './profileFields/profile.fields';
import Spinner from './spinner/spinner';

let commonModule = angular.module('app.common', [
  Navbar,
  Map,
  profileFields,
  Spinner
])

.name;

export default commonModule;
