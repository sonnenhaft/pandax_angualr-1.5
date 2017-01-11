import GoogleGeoLocationService from '../google-geo-location.service';
import template from './panda-find-location.input.html';

const UNKNOWN_PLACE = 'Unknown place';

class controller {

  constructor (GoogleGeoLocationService, $log) {
    'ngInject';

    Object.assign(this, { GoogleGeoLocationService, $log });
    this.locationName = 'Loading current location...';
  }

  $onInit ( ) {
    this.ngModel.$render = ( ) => {
      const currentLocation = this.ngModel.$viewValue; // {coords: {latitude: Number, longitude: Number}, location: object with location}
      if (currentLocation && currentLocation.location) {
        this.locationName = currentLocation.location.formatted_address;
      } else {
        this.locationName = UNKNOWN_PLACE; // actually if there is currentLocation and no location object in there - it is an error
      }
      this.validateModel( );
    };
  }

  findLocationsByName (stringLocation) {
    this.fechedLocations = [];

    this.isSearching = true;
    this.GoogleGeoLocationService.findLocationsByName(stringLocation)
            .then(locations => this.fechedLocations = locations)
            .finally(( ) => this.isSearching = false);
  }

  ifEmptySetFirstLocation (fechedLocations = []) {
    if (fechedLocations.length) {
      this.chooseLocation(fechedLocations[0]);
    }
  }

  validateModel ( ) {
    this.ngModel.$setValidity('addressRegex', !this.addressRegex || !(this.locationName && new RegExp(this.locationName).test(this.locationName)));
    this.ngModel.$setValidity('required', !this.ngRequired || this.locationName);
    this.ngModel.$setValidity('recognizableAddress', !this.recognizableAddress || this.locationName !== UNKNOWN_PLACE);
    const { location = {} } = (this.ngModel.$viewValue || { location: { address_components: [] } });
    const { short_name: zip } = location.address_components.find(item => item.types.indexOf('postal_code') !== -1) || {};

    this.ngModel.$setValidity('nycOnly', !this.nycOnly || (zip && this.validateBigAppleZip(zip)));
  }

  validateBigAppleZip (zip) {
    this.$log.warn('TODO(vald): add zip validation', zip);
    return true;
  }

  chooseLocation (location) {
    const { geometry: { location: coords }, formatted_address: locationName } = location;

    this.locationName = locationName;
    this.ngModel.$setViewValue({ coords, location });
    this.validateModel( );
  }

  clearLocation ( ) {
    this.locationName = '';
    this.ngModel.$setViewValue( );
    this.validateModel( );
  }
}

export default angular.module('pandaFindLocationInput', [
  GoogleGeoLocationService
]).component('pandaFindLocationInput', {
  require: { ngModel: '^ngModel' },
  bindings: { addressContains: '@', ngRequired: '<', recognizableAddress: '<', nycOnly: '<' },
  template,
  controller
}).name;
