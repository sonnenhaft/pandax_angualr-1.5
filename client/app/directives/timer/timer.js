import angular from 'angular';
import TimerDirective from './timer.directive.js';

let timerModule = angular.module('timerDirective', [])

  .directive('timer', TimerDirective)

  .name;

export default timerModule;
