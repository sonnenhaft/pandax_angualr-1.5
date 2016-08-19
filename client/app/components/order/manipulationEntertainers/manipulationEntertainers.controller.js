class manipulationEntertainersController {

  constructor ($state, $mdMedia) {
     'ngInject';

     _.assign(this, {
        $state,
        $mdMedia,
        showComponentOnly: ''
     	});
  }
}

export default manipulationEntertainersController;
