import angular from 'angular';
import uiRouter from 'angular-ui-router';
import paymentsComponent from './payments.component';
import User from '../../services/user.service';
import Cards from '../../services/card/card';

export default angular
  .module('payments', [
    uiRouter,
    User,
    Cards
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.payments', {
        url: '/payments',
        parent: 'main',
        component: 'payments'
      });
  })
  .component('payments', paymentsComponent)
  .name;
