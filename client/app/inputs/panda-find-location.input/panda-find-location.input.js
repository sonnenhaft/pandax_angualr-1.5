import GoogleGeoLocationService from '../google-geo-location.service';
import template from './panda-find-location.input.html';
import ALLOWED_ZIPS from './allowed-nyc-zips-aka-postal-codes.json';

const UNKNOWN_PLACE = 'Unknown place';

class controller {
  ALLOWED_ZIPS = ALLOWED_ZIPS

  constructor (GoogleGeoLocationService, $log, $location, $timeout) {
    'ngInject';

    Object.assign(this, { GoogleGeoLocationService, $log, $location, $timeout });
    this.locationName = 'Loading current location...';
  }

  $onInit ( ) {
    this.ngModel.$render = ( ) => {
      const currentLocation = this.ngModel.$viewValue; // {coords: {latitude: Number, longitude: Number}, location: object with location}
      if (this.asText) {
        this.locationName = currentLocation;
      } else if (currentLocation && currentLocation.location) {
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
    if (!this.asText) {
      const { location = {} } = this.ngModel.$viewValue || { };
      const { address_components: address = [] } = location;
      const { short_name: zip } = address.find(({ types }) => types.includes('postal_code')) || {};

      this.ngModel.$setValidity('nycOnly', !this.nycOnly || this.validateIfZipIsAllowed(zip));
    }
  }

  validateIfZipIsAllowed (zip) {
    if (this.$location.search( ).skipNYcheck) {
      return true;
    }
    if (zip) {
      const zipAsInteger = parseInt(zip, 10); // we don't care 0 value or values with "-" sign, because we have exact list of postal codes
      return !isNaN(zipAsInteger) && this.ALLOWED_ZIPS.includes(zipAsInteger);
    } else {
      return false;
    }
  }

  chooseLocation (location) {
    const { geometry: { location: coords }, formatted_address: locationName } = location;

    this.locationName = locationName;
    if (this.asText) {
      this.ngModel.$setViewValue(locationName);
    } else {
      this.ngModel.$setViewValue({ coords, location });
    }

    this.validateModel( );
  }

  clearLocation ( ) {
    this.locationName = '';
  }

  setDefault ( ) {
    this.ngModel.$setViewValue( );
  }
}

export default angular.module('pandaFindLocationInput', [
  GoogleGeoLocationService
]).component('pandaFindLocationInput', {
  require: { ngModel: '^ngModel' },
  bindings: {
    addressContains: '@',
    label: '@',
    placeholder: '@',
    ngRequired: '<',
    recognizableAddress: '<',
    nycOnly: '<',
    asText: '<'
  },
  template,
  controller
}).name;
