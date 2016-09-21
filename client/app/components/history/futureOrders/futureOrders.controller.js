export default class futuresOrdersController {

  constructor (OrderService) {
    'ngInject';

    _.assign(this, {OrderService});

    OrderService.fetchFuturesOrders()
      .then(data => this.futures = data);

    this.activeOrders = this.findActiveOrders('active');
    this.asapOrders = this.findActiveOrders('asapFlag');
  }

  $onInit () {
    if (this.activeOrders.length || this.asapOrders.length) {
      this.futures = this.moveActiveOrdersToHead();
    }
  }

  findActiveOrders (param) {
    return _
      .chain(this.futures)
      .filter(order => order[param])
      .sortBy(order => order.datetime)
      .value();
  }

  moveActiveOrdersToHead () {
    return _
      .chain(this.futures)
      .remove(['active', true])
      .union(this.activeOrders, this.asapOrders, this.futures)
      .value();
  }

}
