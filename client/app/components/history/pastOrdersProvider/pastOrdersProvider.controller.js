export default class pastOrdersProviderController {

  constructor (OrderService) {
    'ngInject';

    _.assign(this, {OrderService});

    this.OrderService.fetchProviderPastOrders()
    this.history = this.OrderService.getProviderPastOrders();
  }

}
