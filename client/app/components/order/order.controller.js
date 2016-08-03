class orderController {

  constructor (Constants, Location, Helper, $q, moment) {
    'ngInject';

    _.assign(this, {Constants, Location, Helper, $q, moment});

    this.providers = _.reverse(Constants.profile.serviceTypes);

    this.time = Helper.getNearestTime('time');
    this.range = Helper.getNearestTime('range');

    console.log(Helper.getNearestTime())

  }

  $onInit () {
    _.mapValues(this.Constants.order.models, (model, key) => {
      this[key] = model;
    });
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

  getTotalPrice () {
    return _
      .chain(this.Helper.getActiveObjectFromArray(this.providers))
      .map('price')
      .sum()
      .value() * parseFloat(this.hour) * Number(this.entertainer);
  }

  onSearch (form) {
    console.log(_.assign(form, {location: this.location}));
  }

}

export default orderController;
