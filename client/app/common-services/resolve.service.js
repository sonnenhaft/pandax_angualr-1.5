import angular from 'angular';
import User from './user.service';
import OrderService from './orderService.service';
import Constants from './constants.service';
import Request from './request.service';

class Resolve {
  constructor(User, OrderService, Constants, Request, moment, $timeout) {
    'ngInject';

    Object.assign(this, {
      User,
      OrderService,
      Constants,
      Request,
      moment,
      $timeout
    });

  }

  /*
   billing () {
   return this
   .Request
   .send(
   this.User.token(),
   this.Constants.api.cards.get.method,
   this.Constants.api.cards.get.uri(this.User.get('role'))
   )
   .then(
   cards => {
   return {
   first_name: this.User.get('first_name'),
   last_name: this.User.get('last_name'),
   mobile: this.User.get('phone'),
   cards: cards.data
   };
   },
   error => console.log(error)
   )
   .then(billingInfo => this.User.billingInfo = billingInfo);
   }*/

  providers() {
    return this
      .Request
      .send(
        this.User.token(),
        this.Constants.api.service.method,
        this.Constants.api.service.uri(this.User.get('role'))
      )
      .then(
        result => {
          return _.map(result.data, provider => {
            return Object.assign(provider, {
              price: _.round(provider.price),
              img: require('../../assets/images/services/' + provider.name.toLowerCase().replace(/\s+/g, '_') + '.png')
            });
          });
        },
        error => console.log(error)
      )
      .then(providers => this.OrderService.providers = providers);
  }
}

export default angular.module('Resolve', [
  User,
  OrderService,
  Constants,
  Request
]).service('Resolve', Resolve).name;

