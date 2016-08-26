import angular from 'angular';
import Resolve from './resolve.service';
import User from '../user/user';
import OrderService from '../orderService/orderService';
import Constants from '../constant/constants';
import Request from '../request/request';

export default angular
  .module('resolve', [
    User,
    OrderService,
    Constants,
    Request
  ])
  .service('Resolve', Resolve)
  .name;
