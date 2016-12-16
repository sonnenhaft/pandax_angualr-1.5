import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Location from '../../../common-services/location.service';
import Constants from '../../../common-services/constants.service';
import Validation from '../../../common-services/validation.service';
import template from './find-location.page.html';

class controller {

  constructor(Location, Constants, Validation, $timeout) {
    'ngInject';

    Object.assign(this, {
      Location,
      Constants,
      Validation,
      $timeout
    });

  }

  $onChanges(changes) {

    if (
      _.isBoolean(changes.input.currentValue) ||
      (changes.input.currentValue && !changes.input.currentValue.location)
    ) {
      this.validate({ location: this.location });
    }

    if (changes.input.currentValue) {
      this.locationName = changes.input.currentValue.location ?
        changes.input.currentValue.location.formatted_address : 'Unknown place';
      this.location = changes.input.currentValue;
      this.output({ location: this.location });
      this.locations = this.locationError = false;
    }

  }

  getLocation(str) {
    this.location = str;
    this.loading = true;
    this.locations = this.locationError = false;
    this.Location
      .getLocationByString(str, locations => {
        this.$timeout(() => {
          this.loading = false;
          this.locations = locations && locations.length ? locations : false;
        });
      });
  }

  setLocation(item) {
    this.locationError = false;
    this.location = {
      coords: {
        latitude: item.geometry.location.lat(),
        longitude: item.geometry.location.lng()
      },
      location: item
    };

    this.locationName = item.formatted_address;
    this.output({ location: Object.assign(this.location, { zoom: 19 }) });
  }

  clearLocation() {
    this.locationName = '';
    this.locations = this.location = false;
    this.output({ location: this.location });
  }

  checkLocation() {
    if (this.locations && this.locations.length) {
      this.setLocation(_.head(this.locations));
      return false;
    }
    this.output({ location: this.location });
    this.validate({ location: this.location });
  }

  validate(field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
  }

}


export default angular.module('findLocation', [
  uiRouter,
  Location,
  Constants,
  Validation
]).component('findLocation', {
  bindings: {
    input: '<',
    output: '&'
  },
  template,
  controller
}).name;
