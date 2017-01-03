import config from 'config';
import User from './user.service';
import OrderService from './orderService.service';
import Request from './request.service';

class Resolve {
  constructor (User, OrderService, Request) {
    'ngInject';

    Object.assign(this, { User, OrderService, Request });
  }

  providers ( ) {
    return this.Request.get(`${config.API_URL}/api/${this.User.get('role')}/service-types`)
      .then(
        ({ result: { data } }) => _.map(data, provider => Object.assign(provider, {
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
  Request,
  User
]).service('Resolve', Resolve).name;

