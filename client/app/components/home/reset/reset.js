import angular from 'angular';
import uiRouter from 'angular-ui-router';
import resetComponent from './reset.component';
import Validation from '../../../services/validation/validation';

export default angular
  .module('reset', [
    uiRouter,
    Validation
  ])
  .component('reset', resetComponent)
  .name;
