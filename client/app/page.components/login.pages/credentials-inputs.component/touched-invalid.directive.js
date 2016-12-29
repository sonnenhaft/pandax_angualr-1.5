export default angular.module('touchedInvalid', []).directive('touchedInvalid', ( ) => ({
  require: ['^ngModel', '^form'],
  controller: angular.noop,
  link: ($scope, $element, $attr, controllers) => {
    const [ngModel, form] = controllers;
    const $setSubmitted = form.$setSubmitted.bind(form);
    const errorClassName = $attr.touchedInvalid || 'error';
    ngModel.setTouchedInvalid = ( ) => {
      ngModel.touchedInvalid = (form.$submitted || ngModel.$dirty) && ngModel.$invalid;
      if (ngModel.touchedInvalid) {
        $element.addClass(errorClassName);
      } else {
        $element.removeClass(errorClassName);
      }
    };
    $element.bind('blur', ( ) => $scope.$evalAsync(ngModel.setTouchedInvalid));
    ngModel.$viewChangeListeners.unshift(ngModel.setTouchedInvalid);
    form.$setSubmitted = ( ) => {
      $setSubmitted( );
      ngModel.setTouchedInvalid( );
    };
    ngModel.setTouchedInvalid( );
  }
})).name;
