import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contactComponent from './contact.component';
import Constants from '../../services/constant/constants';

export default angular
  .module('contact', [
    uiRouter,
    Constants
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.contact', {
        url: '/contact-us',
        parent: 'main',
        component: 'contact'
      });
  })
  .component('contact', contactComponent)
  .name;
