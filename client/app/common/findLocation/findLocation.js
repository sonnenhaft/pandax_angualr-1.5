import angular from 'angular';
import uiRouter from 'angular-ui-router';
import findLocationComponent from './findLocation.component';
import Location from '../../services/location/location';
import Constants from '../../services/constant/constants';
import Validation from '../../services/validation/validation';

export default angular
  .module('findLocation', [
    uiRouter,
    Location,
    Constants,
    Validation
  ])
  .component('findLocation', findLocationComponent)
  .name;
