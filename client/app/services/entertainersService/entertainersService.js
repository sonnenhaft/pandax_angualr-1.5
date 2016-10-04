import angular from 'angular';
import EntertainersService from './entertainersService.service';

export default angular
  .module('entertainersService', [])
  .service('EntertainersService', EntertainersService)
  .name;