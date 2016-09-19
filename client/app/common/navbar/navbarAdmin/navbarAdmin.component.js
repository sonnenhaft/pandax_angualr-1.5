import template from './navbarAdmin.html';
import controller from './navbarAdmin.controller';
import './navbarAdmin.scss';

let navbarAdminComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default navbarAdminComponent;
