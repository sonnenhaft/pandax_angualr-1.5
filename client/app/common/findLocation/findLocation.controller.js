export default class findLocation {

  constructor (Location, Constants, Validation, $timeout) {
    'ngInject';

    _.assign(this, {
      Location,
      Constants,
      Validation,
      $timeout
    });

  }

  $onChanges (changes) {

    if (_.isBoolean(changes.input.currentValue)) {
      this.validate({location: this.location});
    }

    if (changes.input.currentValue) {
      this.locationName = changes.input.currentValue.location.formatted_address;
      this.location = changes.input.currentValue;
      this.output({location: this.location});
      this.locations = this.locationError = false;
    }

  }

  getLocation (str) {
    this.location = str;
    this.loading = true;
    this.locations = this.locationError = false;
    this.Location
      .getLocationByString(str, locations => {
        this.$timeout(() => {
          this.loading = false;
          this.locations = locations.length ? locations : false;
        });
      });
  }

  setLocation (item) {
    this.locationError = false;
    this.location = {
      coords: {
        latitude: item.geometry.location.lat(),
        longitude: item.geometry.location.lng()
      },
      location: item
    };

    this.locationName = item.formatted_address;
    this.output({location: this.location});
  }

  clearLocation () {
    this.locationName = '';
    this.locations = this.location = false;
    this.output({location: this.location});
    this.validate({location: this.location});
  }

  checkLocation () {
    if (this.locations.length) {
      this.setLocation(_.head(this.locations));
      return true;
    }

    this.validate({location: this.location});
  }

  validate (field) {
    if (this.Validation.error(field).length) {
      _.map(this.Validation.error(field), error => {
        this[error.name + 'Error'] = error.text;
      });
      return false;
    }
    return true;
  }

}
