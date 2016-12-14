/**
 We don't use $timeout, because it runs the $digest cycle very often
 */
import angular from 'angular';
export default angular.module('showInTimeDirective', []).directive('showInTime', ['$compile', 'moment', function ($compile, moment) {
  'ngInject';

  const CSS_CLASS = 'ng-hide',
    ACTOINS = {
      SHOW: 'show',
      HIDE: 'hide'
    };

  return {
    scope: true,
    /**
     * Attributes
     * show-in-time: time to active
     * show-in-time-action: 'show' or 'hide'
     */
    link: (scope, element, attrs) => {
      let timeoutId = null,
        timerPeriod = parseInt(attrs.showInTime) - moment().valueOf() + 1000;   // in ms

      function startTimeout() {
        timeoutId = setTimeout(onTimeout, timerPeriod);
      }

      function onTimeout() {
        showHide(attrs.showInTimeAction);
      }

      function showHide(action) {
        if (action == ACTOINS.SHOW) {
          element.removeClass(CSS_CLASS);
        } else {
          element.addClass(CSS_CLASS);
        }
      }

      function init() {
        if (attrs.showInTimeAction == ACTOINS.SHOW) {
          showHide(ACTOINS.HIDE);
        }

        if (timerPeriod > 0) {
          startTimeout();
        } else {
          showHide(attrs.showInTimeAction);
        }
      }

      init();

      scope.$on('$destroy', (_ev) => {
        clearTimeout(timeoutId);
      });
    }
  }
}]).name;
