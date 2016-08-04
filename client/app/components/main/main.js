import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainComponent from './main.component';

export default angular
  .module('main', [
    uiRouter
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        component: 'main'
      });
  })
  .component('main', mainComponent)
  .name;
