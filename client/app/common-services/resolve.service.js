import OrderService from './orderService.service';

class Resolve {
  constructor (OrderService, $http, StatefulUserData) {
    'ngInject';

    Object.assign(this, { OrderService, $http, StatefulUserData });
  }

  providers ( ) {
    return this.$http.get('{{config_api_url}}/api/{{current_user_role}}/service-types')
      .then(
        ({ data }) => _.map(data, provider => Object.assign(provider, {
          price: _.round(provider.price),
          img: require(`../../assets/images/services/${provider.name.toLowerCase().replace(/\s+/g, '_')}.png`) // eslint-disable-line
        })),
        error => console.log(error)
      )
      .then(providers => this.OrderService.providers = providers);
  }
}

export default angular.module('Resolve', [
  OrderService
]).service('Resolve', Resolve).name;

