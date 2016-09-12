import angular from 'angular';
import uiRouter from 'angular-ui-router';
import confirmedEntertainersComponent from './confirmedEntertainers.component';
import OrderService from '../../../../services/orderService/orderService';
import WebSocket from '../../../../services/webSocket/webSocket';
import CancelOrderForEntertainer from '../../../../services/cancelOrderForEntertainer/cancelOrderForEntertainer';

export default angular
  .module('confirmedEntertainers', [
    uiRouter,
    OrderService,
    WebSocket,
    CancelOrderForEntertainer
  ])

  .component('confirmedEntertainers', confirmedEntertainersComponent)
  .name;
