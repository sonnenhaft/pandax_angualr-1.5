class orderController {

  constructor (Constants) {
    'ngInject';

    this.providers = Constants.profile.serviceTypes;
    this.fields = Constants.order.fields;

    this.date = new Date();
    this.currentDate = new Date();
    this.times = ['17:30', '18:00', '18:30', '19:00'];
    this.entertainers = _.range(1, 7);
    this.entertainer = 1;
    this.hours = ['0.5 H', '1 H', '1.5 H', '2 H', '2.5 H', '3 H', '3.5 H', '4 H'];
    this.hour = '0.5 H';

  }

}

export default orderController;
