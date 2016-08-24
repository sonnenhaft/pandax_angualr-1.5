import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainComponent from './main.component';
import OrderService from '../../services/orderService/orderService';
import Constants from '../../services/constant/constants';
import Request from '../../services/request/request';
import User from '../../services/user/user';

export default angular
  .module('main', [
    uiRouter,
    OrderService,
    Constants,
    Request,
    User
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        component: 'main',
        resolve: {
          providers: (OrderService, Constants, Request, User) => {
            return Request
              .send(
                User.token(),
                Constants.api.service.method,
                Constants.api.service.uri
              )
              .then(
                result => {
                  return _.map(result.data, provider => {
                    return _.assign(provider, {
                      price: _.round(provider.price),
                      img: require('../../../assets/images/services/' + provider.name.toLowerCase().replace(/\s+/g, '_') + '.png')
                    });
                  });
                },
                error => console.log(error)
              )
              .then(providers => {
                OrderService.providers = providers;
              });
          }
        }
      });
  })
  .component('main', mainComponent)
  .name;
