import template from './personalInformation.html';

let personalInformationComponent = {
  restrict: 'E',
  bindings: {
    formObject: '=',
    model: '='
  },
  template,
  controllerAs: 'vm'
};

export default personalInformationComponent;
