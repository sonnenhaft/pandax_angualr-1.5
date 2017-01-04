/** @deprecated cleans scope watchers, weird*/
export default angular.module('timerDirective', []).directive('timer', ($compile, moment) => {
  'ngInject';

  return {
    scope: true,
    link: ($scope, $element, $attrs) => {
      $scope.counter = parseInt($attrs.timer, 10) - moment( ).valueOf( );
      $scope.$$watchers = [];

      const PERIOD_MILLIS = 1000;
      if ($scope.counter > PERIOD_MILLIS) {
        const interval = setInterval(( ) => {
          if ($scope.counter > PERIOD_MILLIS * 2) {
            $scope.counter -= PERIOD_MILLIS;
            $element.text(moment($scope.counter).format('mm:ss'));
          } else {
            clearInterval(interval);
            $element.addClass('ng-hide');
          }
        }, PERIOD_MILLIS);
        $scope.$on('$destroy', ( ) => clearInterval(interval));
      } else {
        $element.addClass('ng-hide');
      }
    }
  };
}).name;

