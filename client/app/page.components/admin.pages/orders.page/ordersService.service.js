import config from 'config';

class OrdersService {
  list = []

  constructor (Request, StatefulUserData) {
    'ngInject';

    Object.assign(this, { Request, StatefulUserData });
  }

  fetchOrders (page = 1) {
    return this.Request.get(`${config.API_URL}/api/${this.StatefulUserData.getRole( )}/orders?page=${page}`).then(result => {
      this.list = this.list.concat(result.data.items);
      return result.data;
    });
  }

  getOrders ( ) { return this.list; }

  getOrderDetails (orderId) {
    return this.Request.get(`${config.API_URL}/api/${this.StatefulUserData.getRole( )}/orders/${orderId}?include=invites`)
      .then(result => result.data);
  }
}

export default angular
  .module('ordersService', [])
  .service('OrdersService', OrdersService)
  .name;
