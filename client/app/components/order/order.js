import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';
import User from '../../services/user/user';
import searchEntertainers from './searchEntertainers/searchEntertainers';
import Constants from '../../services/constant/constants';
import Location from '../../services/location/location';
import Helper from '../../services/helper/helper';
import Validation from '../../services/validation/validation';
import orderConfirm from './orderConfirm/orderConfirm';
import manipulationEntertainers from './manipulationEntertainers/manipulationEntertainers';
import Request from '../../services/request/request';
import orderTerms from './orderTerms/orderTerms';


export default angular
  .module('order', [
    uiRouter,
    User,
    searchEntertainers,
    Constants,
    Location,
    Helper,
    Validation,
    orderConfirm,
    manipulationEntertainers,
    Request,
    orderTerms
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.order', {
        url: '/order',
        parent: 'main',
        controller: (providers, $scope) => {
          $scope.providers = providers;
        },
        template: '<order providers="providers"></order>',
        resolve: {
          providers: (Constants, Request, User) => {
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
                      img: '/assets/images/services/' + provider.name.toLowerCase() + '.png'
                    });
                  });
                },
                error => console.log(error)
              )
          }
        }
      });
  })
  .component('order', orderComponent)
  .name;
