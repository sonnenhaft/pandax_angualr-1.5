class manipulationEntertainersController {

  constructor ($state, $mdMedia, $stateParams, OrderService, Constants) {
     'ngInject';

     _.assign(this, {
        $state,
        $mdMedia,
        $stateParams,
        OrderService,
        Constants,
        showComponentOnly: '',
        itemActiveIndex: 0
     });
  }
}

export default manipulationEntertainersController;
