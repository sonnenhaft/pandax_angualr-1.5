class manipulationEntertainersController {

  constructor ($state, $mdMedia, $stateParams, OrderService) {
     'ngInject';

     _.assign(this, {
        $state,
        $mdMedia,
        $stateParams,
        OrderService,
        showComponentOnly: ''
     	});
  }
}

export default manipulationEntertainersController;
