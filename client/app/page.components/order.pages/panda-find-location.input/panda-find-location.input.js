import GoogleGeoLocationService from '../google-geo-location.service';
import template from './panda-find-location.input.html';

const UNKNOWN_PLACE = 'Unknown place';

class controller {

  constructor (GoogleGeoLocationService, Validation) {
    'ngInject';

    Object.assign(this, { GoogleGeoLocationService, Validation });
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
  }

  chooseLocation (location) {
    const { geometry: { location: coords }, formatted_address: locationName } = location;

    this.locationName = locationName;
    this.validateModel( );
    this.ngModel.$setViewValue({ coords, location });
  }

  clearLocation ( ) {
    this.locationName = '';
    this.validateModel( );
    this.ngModel.$setViewValue(null);
  }
}

export default angular.module('pandaFindLocationInput', [
  GoogleGeoLocationService
]).component('pandaFindLocationInput', {
  require: { ngModel: '^ngModel' },
  bindings: { addressContains: '@', ngRequired: '<', recognizableAddress: '<' },
  template,
  controller
}).name;
