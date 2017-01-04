class OrdersService {
  list = []

  constructor ($http, StatefulUserData) {
    'ngInject';

    Object.assign(this, { $http, StatefulUserData });
  }

  fetchOrders (page = 1) {
    return this.$http.get(`{{config_api_url}}/api/{{current_user_role}}/orders?page=${page}`).then(result => {
      this.list = this.list.concat(result.data.items);
      return result.data;
    });
  }

  getOrders ( ) { return this.list; }

  getOrderDetails (orderId) {
    return this.$http.get(`{{config_api_url}}/api/{{current_user_role}}/orders/${orderId}?include=invites`)
      .then(result => result.data);
  }
}

export default angular
  .module('ordersService', [])
  .service('OrdersService', OrdersService)
  .name;
