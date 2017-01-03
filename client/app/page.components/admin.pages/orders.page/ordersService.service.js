import config from 'config';

class OrdersService {
  constructor (Request, User) {
    'ngInject';

    Object.assign(this, { Request, User, list: [] });
  }

  fetchOrders (page = 1) {
    return this.Request.get(`${config.API_URL}/api/${this.User.get('role')}/orders?page=${page}`).then(result => {
      this.list = this.list.concat(result.data.items);
      return result.data;
    });
  }

  getOrders ( ) { return this.list; }

  getOrderDetails (orderId) {
    return this.Request.get(`${config.API_URL}/api/${this.User.get('role')}/orders/${orderId}?include=invites`)
      .then(result => result.data);
  }
}

export default angular
  .module('ordersService', [])
  .service('OrdersService', OrdersService)
  .name;
