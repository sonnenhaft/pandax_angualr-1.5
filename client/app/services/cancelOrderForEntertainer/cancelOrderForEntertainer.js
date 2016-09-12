import angular from 'angular';
import CancelOrderForEntertainer from './cancelOrderForEntertainer.service';
import Constants from '../constant/constants';

export default angular
  .module('cancelOrderForEntertainer', [
  	Constants
  ])
  .service('CancelOrderForEntertainer', CancelOrderForEntertainer)
  .name;
