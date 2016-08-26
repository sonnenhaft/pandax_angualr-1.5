export default class futureOrdersController {

  constructor (OrderService) {
    'ngInject';

    _.assign(this, {OrderService});

    this.history = OrderService.getFutureOrders();
    this.activeOrders = this.findActiveOrders('active');
    this.asapOrders = this.findActiveOrders('asap');

  }

  $onInit () {
    if (this.activeOrders.length || this.asapOrders.length) {
      this.history = this.moveActiveOrdersToHead();
    }
  }

  findActiveOrders (param) {
    return _
      .chain(this.history)
      .filter(order => order[param])
      .sortBy(order => order.datetime)
      .value();
  }

  moveActiveOrdersToHead () {
    return _
      .chain(this.history)
      .remove(['active', true])
      .union(this.activeOrders, this.asapOrders, this.history)
      .value();
  }

}
