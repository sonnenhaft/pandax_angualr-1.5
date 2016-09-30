export default class Customers {

  constructor (Constants, Request) {
    'ngInject';

    _.assign(this, {
        Constants,
        Request,
        list: []
    });

  }

  fetchCustomers(page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.customers.get.method,
        this.Constants.api.customers.get.uri(page)
      )
      .then(
        result => {
          this.list = this.list.concat(result.data.items);
          return result.data;
        }
      );
  }

  getCustomers() {
    return this.list;
  }

}
