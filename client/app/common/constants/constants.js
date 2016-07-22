import angular from 'angular';
import constantsComponent from './constants.component';
import profileAttributesConstant from './profileAttributes.constant.js';

let constantsModule = angular.module('constants', [

])

.component('constants', constantsComponent)

.constant('PROFILE_ATTRIBUTES_CONSTANT', profileAttributesConstant)

.name

export default constantsModule;
