import template from './navbar.html';
import controller from './navbar.controller';

let navbarComponent = {
  bindings: {
  	userAvatarSrc: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default navbarComponent;
