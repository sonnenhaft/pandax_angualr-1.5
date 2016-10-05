export default class Orders {

  constructor (Constants, Request) {
    'ngInject';

    _.assign(this, {
        Constants,
        Request,
        list: []
    });

  }

  fetchOrders(page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.orders.method,
        this.Constants.api.orders.uri(page)
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

}
