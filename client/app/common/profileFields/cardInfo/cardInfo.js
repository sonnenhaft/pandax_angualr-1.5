import angular from 'angular';
import cardInfoComponent from './cardInfo.component';
import messages from '../../messages/messages';

export default angular
  .module('cardInfo', [
		messages
  ])
  .component('cardInfo', cardInfoComponent)
  .name;
