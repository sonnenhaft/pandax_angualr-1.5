import angular from 'angular';
import User from './user.service';
import Storage from '../storage/storage';
import Constants from '../constants.service';
import Request from '../request/request';

export default angular
  .module('user', [
    Storage,
    Constants,
    Request
  ])
  .service('User', User)
  .name;
