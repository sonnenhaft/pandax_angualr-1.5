class orderController {

  constructor (User, Constants, Helper, Validation, OrderService, Request, $window, $state, $mdDialog, moment) {
    'ngInject';

    _.assign(this, {
      User,
      Constants,
      Helper,
      Validation,
      OrderService,
      Request,
      $state,
      $mdDialog,
      maxDateForCreating: moment().add(Constants.order.maxPeriodForCreating.value, Constants.order.maxPeriodForCreating.key).toDate()
    });
    this.mobile = $window.innerWidth <= 960;

    $window.addEventListener('resize', () => {
      this.mobile = $window.innerWidth <= 960;
    });

  }

  $onInit () {
    this.providers = _.map(this.OrderService.getProviders(), (provider, i) => {
      provider.active = i == 0 ? true : false;
      return provider;
    });

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

  onDateChange (date) {
    this.dateError = false;
    if (this.validate({date})) {
      this.range = this.Helper.getNearestTime('range', date);
    }
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

  onSearch (orderModel, form) {
    if ((this.typeError = !this.Helper.getActiveObjectFromArray(this.providers).length) || form.$invalid) {
      return false;
    }
    
    this.orderLoading = true;

    if (
      !this.validate({
        apt: orderModel.apt,
        location: this.inputLocation,
        date: orderModel.date
      })
    ) {
      this.location = false;
      this.orderLoading = false;
      return false;
    }

    if (this.User.get('is_newcomer')) {
      this.$state.go('main.accept', {order: this.orderData(orderModel)});
      return false;
    }

    this.Request
      .send(
        this.User.token(),
        this.Constants.api.order.method,
        this.Constants.api.order.uri,
        this.orderData(orderModel)
      )
      .then(
        result => {
          this.orderLoading = false;
          this.User.update(result.data.customer);
          this.$state.go('main.manipulationEntertainers', {orderId: result.data.id, channelName: result.data.channel_name});
        },
        error => {
          this.orderLoading = false;
          console.log(error);
        }
      );
  }

  orderData (orderModel) {
    return this
      .OrderService
      .buildOrder(
        _.assign(orderModel, {
          geo: this.inputLocation,
          price: this.getTotalPrice()
        })
      );
  }

  showEntertainersCountInfo (event) {
    this.$mdDialog
      .show({
        contentElement: '#entertainers-count-info',
        targetEvent: event
      });
  }

}

export default orderController;
