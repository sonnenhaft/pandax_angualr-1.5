/**
 We don't use $timeout, because it runs the $digest cycle very often
 */

import angular from 'angular';

export default angular.module('timerDirective', [
]).directive('timer', ['$compile', 'moment', function ($compile, moment) {
  'ngInject';

  const CSS_CLASS = 'ng-hide';

  return {
    scope: true,
    link: (scope, element, attrs) => {
      let intervalId = null,
        timerPeriod = 1000;   // in ms

      scope.counter = parseInt(attrs.timer) - moment().valueOf();
      scope.$$watchers = [];

      function start() {
        intervalId = setInterval(onInterval, timerPeriod);
      }

      function onInterval() {
        scope.counter = scope.counter - timerPeriod;

        if (scope.counter <= timerPeriod) {
          clearInterval(intervalId);
          hideTimer();
          return;
        }
        element.text(moment(scope.counter).format('mm:ss'));
      }

      function hideTimer() {
        element.addClass(CSS_CLASS);
      }

      if (scope.counter > timerPeriod) {
        start();
      } else {
        hideTimer();
      }

      scope.$on('$destroy', (_ev) => {
        clearInterval(intervalId);
      });
    }
  }
}]).name;
;
