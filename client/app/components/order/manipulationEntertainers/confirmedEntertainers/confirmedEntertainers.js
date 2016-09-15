import angular from 'angular';
import uiRouter from 'angular-ui-router';
import confirmedEntertainersComponent from './confirmedEntertainers.component';
import OrderService from '../../../../services/orderService/orderService';
import WebSocket from '../../../../services/webSocket/webSocket';
import timer from '../../../../directives/timer/timer';
import byStatuses from '../../../../common/filters/byStatuses.filter';

export default angular
  .module('confirmedEntertainers', [
    uiRouter,
    OrderService,
    WebSocket,
    timer
  ])

  .filter('byStatuses', byStatuses)

  .component('confirmedEntertainers', confirmedEntertainersComponent)
  .name;
