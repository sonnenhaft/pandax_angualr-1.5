export default class historyMinxController {

  constructor ($stateParams, Constants) {
    'ngInject';

    _.assign(this, {
    	$stateParams,
    	Constants
    });

    this.type = $stateParams.type;
  }

}
