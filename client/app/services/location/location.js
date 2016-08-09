import angular from 'angular';
import Location from './location.service';

export default angular
  .module('location', [])
  .service('Location', Location)
  .name;
