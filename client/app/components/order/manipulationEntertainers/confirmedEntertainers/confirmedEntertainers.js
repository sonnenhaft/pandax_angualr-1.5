import angular from 'angular';
import uiRouter from 'angular-ui-router';
import confirmedEntertainersComponent from './confirmedEntertainers.component';
import OrderService from '../../../../services/orderService/orderService';
import WebSocket from '../../../../services/webSocket/webSocket';

export default angular
  .module('confirmedEntertainers', [
    uiRouter,
    OrderService,
    WebSocket
  ])

  .component('confirmedEntertainers', confirmedEntertainersComponent)
  .name;
