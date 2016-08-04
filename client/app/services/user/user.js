import angular from 'angular';
import User from './user.service';
import Storage from '../storage/storage';

export default angular
  .module('user', [Storage])
  .service('User', User)
  .name;
