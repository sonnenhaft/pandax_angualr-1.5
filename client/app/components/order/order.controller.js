class orderController {

  constructor (User, Constants, Location, Helper, Validation, OrderService, Request, $q, $window, $state, moment, $mdDialog) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      Location,
      Helper,
      Validation,
      OrderService,
      Request,
      $q,
      $state,
      moment,
      $mdDialog
    });

    this.providers = OrderService.getProviders();
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

    if (this.User.get('is_newcomer')) {
      this.entertainers = _.slice(this.entertainers, 1);
      this.entertainer = _.head(this.entertainers);
    }

    if (!this.User.get('is_newcomer')) {
      this.hours = _.slice(this.hours, 1);
      this.hour = _.head(this.hours);
    }
  }

  showDescription (event, index) {
    this.$mdDialog
      .show({
        contentElement: '#typeDescr-' + index,
        parent: document.body,
        targetEvent: event,
        clickOutsideToClose: true
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

    if (!this.validate({apt: form.apt, location: this.searchText})) {
      return false;
    }

    this.orderLoading = true;

    let data = {
      service_type: Number(_.head(this.Helper.getActiveObjectFromArray(this.providers)).type),
      length: parseFloat(form.hour).toString(),
      location: this.searchText,
      coordinates: {
        lat: this.location.coords.latitude.toString(),
        long: this.location.coords.longitude.toString()
      },
      location_notes: form.notes ? form.notes : '',
      apartment: form.apt,
      asap: form.asap,
      datetime: form.asap ?
        this.moment() :
        this.moment(new Date(this.moment(form.date).format('YYYY/MM/DD') + ' ' + form.time)),
      entertainers_number: Number(form.entertainer),
      guests_number: form.guest.toString(),
      cost: this.getTotalPrice().toString()
    };

    this.Request
      .send(
        this.User.token(),
        this.Constants.api.order.method,
        this.Constants.api.order.uri,
        data
      )
      .then(
        result => {
          this.orderLoading = false;
          this.$state.go('main.searchEntertainers');
          console.log(result);
        },
        error => {
          this.orderLoading = false;
          console.log(error);
        }
      );
  }

}

export default orderController;
