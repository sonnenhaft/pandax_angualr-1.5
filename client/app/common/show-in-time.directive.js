/** We don't use $timeout, because it runs the $digest cycle very often */
export default angular.module('showInTimeDirective', []).directive('showInTime', ($compile, moment) => {
  'ngInject';

  const CSS_CLASS = 'ng-hide';
  const ACTOINS = {
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
      let timeoutId = null;
      const timerPeriod = (parseInt(attrs.showInTime, 10) - moment( ).valueOf( )) + 1000;   // in ms

      function showHide (action) {
        if (action == ACTOINS.SHOW) {
          element.removeClass(CSS_CLASS);
        } else {
          element.addClass(CSS_CLASS);
        }
      }

      function onTimeout ( ) {
        showHide(attrs.showInTimeAction);
      }

      function startTimeout ( ) {
        timeoutId = setTimeout(onTimeout, timerPeriod);
      }

      function init ( ) {
        if (attrs.showInTimeAction == ACTOINS.SHOW) {
          showHide(ACTOINS.HIDE);
        }

        if (timerPeriod > 0) {
          startTimeout( );
        } else {
          showHide(attrs.showInTimeAction);
        }
      }

      init( );

      scope.$on('$destroy', _ev => {
        clearTimeout(timeoutId);
      });
    }
  };
}).name;
