import angular from 'angular';
import ActiveMenuItemDirective from './activeMenuItem.directive.js';

let activeMenuItemModule = angular.module('activeMenuItemDirective', [])

  .directive('activeMenuItem', ActiveMenuItemDirective)

  .name;

export default activeMenuItemModule;
