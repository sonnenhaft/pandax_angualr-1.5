import angular from 'angular';
import Navbar from './navbar/navbar';
import Map from './map/map';
import profileFields from './profileFields/profile.fields';
import Spinner from './spinner/spinner';
import findLocation from './findLocation/findLocation';

let commonModule = angular.module('app.common', [
  Navbar,
  Map,
  profileFields,
  Spinner,
  findLocation
])

.name;

export default commonModule;
