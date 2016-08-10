import angular from 'angular';
import uiRouter from 'angular-ui-router';
import spinnerComponent from './spinner.component';

export default angular
  .module('spinner', [
    uiRouter
  ])
  .component('spinner', spinnerComponent)
  .name;
