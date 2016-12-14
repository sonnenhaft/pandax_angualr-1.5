import angular from 'angular';
import uiRouter from 'angular-ui-router';
import confirmedEntertainersComponent from './confirmedEntertainers.component';
import OrderService from '../../../../services/orderService/orderService';
import WebSocket from '../../../../services/webSocket/webSocket';
import timer from '../../../../directives/timer/timer';
import byStatuses from './byStatuses.filter';
import showInTime from '../../../../directives/showInTime/showInTime';

export default angular
  .module('confirmedEntertainers', [
    uiRouter,
    OrderService,
    WebSocket,
    timer,
    showInTime
  ])

  .filter('byStatuses', byStatuses)

  .component('confirmedEntertainers', confirmedEntertainersComponent)
  .name;
