export default angular.module('touchedInvalid', [
]).directive('touchedInvalid', ( ) => ({
  require: ['^ngModel', '^form', '?^inputWrapper'],
  controller: angular.noop,
  link: ($scope, $element, { touchedInvalid: errorClassName }, [ngModel, form, inputWrapper]) => {
    errorClassName = errorClassName || 'error';
    const initialSetSubmitted = form.$setSubmitted;
    const $setSubmitted = initialSetSubmitted.bind(form);
    const classedElement = inputWrapper ? inputWrapper.$element : $element;
    ngModel.setTouchedInvalid = ( ) => {
      ngModel.touchedInvalid = (form.$submitted || ngModel.$dirty) && ngModel.$invalid;
      if (ngModel.touchedInvalid) {
        classedElement.addClass(errorClassName);
      } else {
        classedElement.removeClass(errorClassName);
      }
    };
    $element.bind('blur', ( ) => $scope.$evalAsync(ngModel.setTouchedInvalid));
    ngModel.$viewChangeListeners.unshift(ngModel.setTouchedInvalid);
    form.$setSubmitted = ( ) => {
      $setSubmitted( );
      ngModel.setTouchedInvalid( );
    };
    ngModel.setTouchedInvalid( );

    $scope.$on('$destroy', ( ) => form.$setSubmitted = initialSetSubmitted);
  }
})).name;
