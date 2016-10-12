export default class Orders {

  constructor (Constants, Request, User) {
    'ngInject';

    _.assign(this, {
        Constants,
        Request,
        User,
        list: []
    });

  }

  fetchOrders(page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.orders.getAll.method,
        this.Constants.api.orders.getAll.uri(this.User.get('role'), page)
      )
      .then(
        result => {
          this.list = this.list.concat(result.data.items);
          return result.data;
        }
      );
  }

  getOrders() {
    return this.list;
  }

  getOrderDetails(orderId) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.orders.getOne.method,
        this.Constants.api.orders.getOne.uri(this.User.get('role'), orderId)
      )
      .then(result => result.data);
  }
}
