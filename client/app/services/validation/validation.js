import angular from 'angular';
import Validation from './validation.service';

export default angular
  .module('validation', [])
  .service('Validation', Validation)
  .name;
