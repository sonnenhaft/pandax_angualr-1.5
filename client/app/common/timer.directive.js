/**
 We don't use $timeout, because it runs the $digest cycle very often
 */

import angular from 'angular';

export default angular.module('timerDirective', [
]).directive('timer', ($compile, moment) => {
  'ngInject';

  const CSS_CLASS = 'ng-hide';

  return {
    scope: true,
    link: (scope, element, attrs) => {
      let intervalId = null;
      const timerPeriod = 1000;   // in ms

      scope.counter = parseInt(attrs.timer, 10) - moment( ).valueOf( );
      scope.$$watchers = [];

      function hideTimer ( ) {
        element.addClass(CSS_CLASS);
      }

      function onInterval ( ) {
        scope.counter -= timerPeriod;

        if (scope.counter <= timerPeriod) {
          clearInterval(intervalId);
          hideTimer( );
          return;
        }
        element.text(moment(scope.counter).format('mm:ss'));
      }

      function start ( ) {
        intervalId = setInterval(onInterval, timerPeriod);
      }

      if (scope.counter > timerPeriod) {
        start( );
      } else {
        hideTimer( );
      }

      scope.$on('$destroy', _ev => {
        clearInterval(intervalId);
      });
    }
  };
}).name;

