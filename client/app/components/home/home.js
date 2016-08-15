import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import signIn from './signin/signin';
import signUp from './signup/signup';
import Restore from './restore/restore';
import Reset from './reset/reset';

export default angular
  .module('home', [
    uiRouter,
    signIn,
    signUp,
    Restore,
    Reset
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('home', {
        url: '/?signup&user&restore&reset',
        component: 'home'
      });
  })
  .component('home', homeComponent)
  .name;
