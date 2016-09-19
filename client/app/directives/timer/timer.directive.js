/**
 We don't use $timeout, because it runs the $digest cycle very often
 */
let TimerDirective = ['$compile', 'moment', function($compile, moment) {
  'ngInject';

  const CSS_CLASS = 'ng-hide';

  return {
    scope: true,
    link: (scope, element, attrs) => {
      let timeoutId = null,
          timerPeriod = 1000;   // in ms

      scope.counter = parseInt(attrs.timer) - moment().valueOf();
      scope.$$watchers = [];

      function start() {
        timeoutId = setTimeout(onTimeout, timerPeriod);  
      }
      
      function onTimeout() {
        if(scope.counter <= 0) {
          clearTimeout(timeoutId);
          hideTimer();
          return;
        }
        scope.counter = scope.counter - timerPeriod;
        element.text(moment(scope.counter).format('mm:ss'));
        timeoutId = setTimeout(onTimeout, timerPeriod);
      }

      function hideTimer() {
        element.addClass(CSS_CLASS);
      }

      if (scope.counter > 0) {
        start();
      } else {
        hideTimer();
      }

      scope.$on('$destroy', (_ev) => {
        clearTimeout(timeoutId);
      });
    }
  }
}];

export default TimerDirective;
