export default class pastOrdersController {

  constructor (OrderService) {
    'ngInject';

    _.assign(this, {OrderService});

    this.history = OrderService.getPastOrders();

  }

}
