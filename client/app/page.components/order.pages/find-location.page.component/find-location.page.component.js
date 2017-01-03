import Location from '../../../common-services/location.service';
import Validation from '../../../common-services/validation.service';
import template from './find-location.page.html';

class controller {

  constructor (Location, Validation, $timeout) {
    'ngInject';

    Object.assign(this, { Location, Validation, $timeout });
  }

  $onChanges ({ input: { currentValue } }) {
    if (_.isBoolean(currentValue) || (currentValue && !currentValue.location)) {
      this.validate({ location: this.location });
    }

    if (currentValue) {
      this.locationName = currentValue.location ? currentValue.location.formatted_address : 'Unknown place';
      this.location = currentValue;
      this.output({ location: this.location });
      this.locations = this.locationError = false;
    }
  }

  getLocation (location) {
    this.location = location;
    this.loading = true;
    this.locations = this.locationError = false;
    this.Location.getLocationByString(location, locations => this.$timeout(( ) => {
      this.loading = false;
      this.locations = locations && locations.length ? locations : false;
    }));
  }

  setLocation (gLocation) {
    this.locationError = false;
    this.location = {
      coords: { latitude: gLocation.geometry.location.lat( ), longitude: gLocation.geometry.location.lng( ) },
      location: gLocation
    };

    this.locationName = gLocation.formatted_address;
    this.output({ location: Object.assign(this.location, { zoom: 19 }) });
  }

  clearLocation ( ) {
    this.locationName = '';
    this.locations = this.location = false;
    this.output({ location: this.location });
  }

  /** @deprecated messy bool logic */
  checkLocation ( ) {
    if (this.locations && this.locations.length) {
      this.setLocation(_.head(this.locations));
      return false;
    } else {
      this.output({ location: this.location });
      this.validate({ location: this.location });
    }
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[`${error.name}Error`] = error.text;
      });
      return false;
    } else {
      return true;
    }
  }
}

export default angular.module('findLocation', [
  Location,
  Validation
]).component('findLocation', {
  bindings: { input: '<', output: '&' },
  template,
  controller
}).name;
