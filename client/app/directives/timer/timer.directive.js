let TimerDirective = ['$timeout', '$compile', 'moment', function($timeout, $compile, moment) {
  'ngInject';

  return {
    link: (scope, element, attrs) => {
      let timeoutId = null;

      scope.counter = parseInt(attrs.timer) - moment().valueOf();

      function start() {
        timeoutId = $timeout(onTimeout, 1000);  
      }
      
      function onTimeout() {
        if(scope.counter <= 0) {
          $timeout.cancel(timeoutId);
          return;
        }
        scope.counter = scope.counter - 1000;
        element.text(moment(scope.counter).format('mm:ss'));
        timeoutId = $timeout(onTimeout, 1000);
      }

      if (scope.counter > 0) {
        start();
      }

      scope.$on('$destroy', (_ev) => {
        $timeout.cancel(timeoutId);
      });
    }
  }
}];

export default TimerDirective;
