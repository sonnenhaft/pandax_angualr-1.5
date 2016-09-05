import angular from 'angular';
import personalInformationComponent from './personalInformation.component';
import messages from '../../messages/messages';

export default angular
  .module('personalInformation', [
		messages
  ])
  .component('personalInformation', personalInformationComponent)
  .name;
