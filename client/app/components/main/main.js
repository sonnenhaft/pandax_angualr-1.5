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
          },
          history: (OrderService, Constants, Request, User) => {
            //TODO: Replace with real data from server
            OrderService.history = {
              past: [
                {
                  id: 1,
                  datetime: new Date(),
                  service_type: 1,
                  address: 'Santa Monica Fwy 1110',
                  guests: 3,
                  duration: '1h 30m',
                  initial_price: 250,
                  final_price: 250,
                  provider: [
                    {
                      name: 'Agnes',
                      duration: '1h 30m',
                      price: 100,
                      img: ''
                    },
                    {
                      name: 'Kimberly',
                      duration: null,
                      price: 50,
                      img: '',
                      rejected: true
                    },
                    {
                      name: 'Rebecca',
                      duration: null,
                      price: 0,
                      img: '',
                      declined: true
                    },
                    {
                      name: 'Agnes',
                      duration: '1h 30m',
                      price: 100,
                      img: ''
                    },
                    {
                      name: 'Agnes',
                      duration: '45m',
                      price: 100,
                      img: ''
                    }
                  ]
                },
                {
                  id: 2,
                  datetime: new Date(),
                  service_type: 3,
                  address: '365 W Craig Rd #123, North Las Vegas, NV 89032, USA',
                  guests: 1,
                  duration: '2h',
                  initial_price: 800,
                  final_price: 800,
                  provider: [
                    {
                      name: 'Lil',
                      duration: '2h',
                      price: 400,
                      img: ''
                    },
                    {
                      name: 'Sara',
                      duration: '2h',
                      price: 400,
                      img: ''
                    }
                  ]
                }
              ],
              future: [

              ]
            };
          }
        }
      });
  })
  .component('main', mainComponent)
  .name;
