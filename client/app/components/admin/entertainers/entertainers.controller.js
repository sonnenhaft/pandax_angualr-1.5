class EntertainersController {

  constructor (EntertainersService) {
    'ngInject';

    _.assign(this, {
    	EntertainersService
    });
console.log('this:', this.EntertainersService);
  }

}

export default EntertainersController;
