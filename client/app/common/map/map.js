import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './map.component';
import Location from '../../services/location/location';
import Constants from '../../services/constant/constants';

export default angular
  .module('map', [
    uiRouter,
    Location,
    Constants
  ])
  .component('map', mapComponent)
  .name;
