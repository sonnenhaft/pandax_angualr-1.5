import template from './navbar.html';
import controller from './navbar.controller';

let navbarComponent = {
  restrict: 'E',
  bindings: {
  	userAvatarSrc: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default navbarComponent;
