import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainComponent from './main.component';
import Resolve from '../../services/resolve/resolve';

export default angular
  .module('main', [
    uiRouter,
    Resolve
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        component: 'main',
        resolve: {
          billing: Resolve => Resolve.billing(),
          providers: Resolve => Resolve.providers(),
          history: Resolve => Resolve.history()
        }
      });
  })
  .component('main', mainComponent)
  .name;
