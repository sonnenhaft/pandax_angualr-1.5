import angular from 'angular';

export default angular.module('constants', [])
  .component('constants', {})
  .constant('PROFILE_ATTRIBUTES_CONSTANT', {
    serviceTypes: [
      { value: '1', text: 'X' },
      { value: '2', text: 'XX' },
      { value: '3', text: 'XXX' }
    ]
  }).name;
