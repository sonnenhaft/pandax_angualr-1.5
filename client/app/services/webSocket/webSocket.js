import angular from 'angular';
import WebSocket from './webSocket.service';
import 'angular-websocket';

export default angular
  .module('WebSocket', [
  	'angular-websocket'
  	])
  .service('WebSocket', WebSocket)
  .name;
