import config from 'config';
import OrderService from './orderService.service';
import Request from './request.service';

class Resolve {
  constructor (OrderService, Request, StatefulUserData) {
    'ngInject';

    Object.assign(this, { OrderService, Request, StatefulUserData });
  }

  providers ( ) {
    return this.Request.get(`${config.API_URL}/api/${this.StatefulUserData.getRole( )}/service-types`)
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
  OrderService,
  Request
]).service('Resolve', Resolve).name;

