import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyComponent from './history.component';
import futureOrders from './futureOrders/futureOrders';
import pastOrders from './pastOrders/pastOrders';
import OrderService from '../../services/orderService/orderService';
import pastOrdersProvider from './pastOrdersProvider/pastOrdersProvider';


export default angular
  .module('history', [
    uiRouter,
    futureOrders,
    pastOrders,
    OrderService,
    pastOrdersProvider
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('main.history', {
        url: '/orders-history',
        params: {
          type: ''
        },
        parent: 'main',
        component: 'history',
        resolve: {
          isOnPending: (User, Constants, $q) => {
            let result;
            if (User.get('role') == 'provider') {
              result = User.getActualStatus()
                        .then(status => status == Constants.admin.statuses.entertainer.pending);
            } else {
              let defer = $q.defer();
              defer.resolve(false);
              result = defer.promise;
            }

            return result;
          }
        }
      });
  })
  .component('history', historyComponent)
  .name;
