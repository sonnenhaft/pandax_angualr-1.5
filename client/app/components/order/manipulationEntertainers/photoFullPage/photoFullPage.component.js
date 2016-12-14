import template from './photoFullPage.html';
import controller from './photoFullPage.controller';

let photoFullPageComponent = {
  bindings: {
  	photos: '=',
  	photoIndexActive: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default photoFullPageComponent;
