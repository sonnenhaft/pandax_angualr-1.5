class orderController {

  constructor (Constants, Location, Helper, Validation, $q, $window, moment) {
    'ngInject';

    _.assign(this, {Constants, Location, Helper, Validation, $q, moment});

    this.mobile = $window.innerWidth <= 960;

    $window.addEventListener('resize', () => {
      this.mobile = $window.innerWidth <= 960;
    });

  }

  $onInit () {
    _.mapValues(this.Constants.order.models, (model, key) => {
      this[key] = model;
    });

    this.time = this.Helper.getNearestTime('time');
    this.range = this.Helper.getNearestTime('range');
  }

  getLocation (str) {
    let deferred = this.$q.defer();

    this.Location
      .getLocationByString(str, location => {
        deferred.resolve(location);
      });

    return deferred.promise;
  }

  setLocation (item) {
    this.location = {
      coords: {
        latitude: item.geometry.location.lat(),
        longitude: item.geometry.location.lng()
      },
      location: item
    }
  }

  markerLocation ($event) {
    if ($event) {
      this.location = $event;
      this.searchText = $event.location.formatted_address;
    }
  }

  onDateChange (date) {
    this.range = this.Helper.getNearestTime('range', date);
  }

  getTotalPrice () {
    return _
      .chain(this.Helper.getActiveObjectFromArray(this.providers))
      .map('price')
      .sum()
      .value() * parseFloat(this.hour) * Number(this.entertainer);
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

  onSearch (form) {
    if (!this.Helper.getActiveObjectFromArray(this.providers).length) {
      this.typeError = true;
      return false;
    }


    console.log(
      _.assign(form, {
        location: this.location,
        service: this.Helper.getActiveObjectFromArray(this.providers)
      })
    );
  }

}

export default orderController;
