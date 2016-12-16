import angular from 'angular';
import Cards from './card.service';
import User from '../user/user';
import Constants from '../constants.service';
import Request from '../request/request';

export default angular
  .module('card', [
    User,
    Constants,
    Request
  ])
  .service('Cards', Cards)
  .name;
