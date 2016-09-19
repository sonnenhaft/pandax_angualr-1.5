import angular from 'angular';
import ShowInTimeDirective from './showInTime.directive.js';

let showInTimeModule = angular.module('showInTimeDirective', [])

  .directive('showInTime', ShowInTimeDirective)

  .name;

export default showInTimeModule;
