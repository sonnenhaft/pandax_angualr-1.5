export default class Order {


  constructor (User, Constants, Request, Helper, moment) {
    'ngInject';

    _.assign(this, {
        User,
        Constants,
        Request,
        list: [],
        listConfirmed: [],
        providers: [],
        history: [],
        entertainersInvitedCount: 0,
        entertainersConfirmedCount: 0,
        Helper,
        moment,
        orderDetails: {}
    });

  }

  fetchEntertainers(orderId) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.searchEntertainers.method,
        this.Constants.api.searchEntertainers.uri(orderId)
      )
      .then(
        result => {
          return this.list = result.data;
        },
        error => console.log(error)
      );
  }

  getEntertainers() {
    return this.list;
  }

  getProviders() {
    return this.providers;
  }

  getProviderById(id) {
    return _.find(this.providers, ['type', id]);
  }

  getPastOrders() {
    return _.orderBy(this.history.past, order => order.datetime, 'desc');
  }

  getFutureOrders() {
    return _.sortBy(this.history.future, order => order.datetime);
  }

  getOrdersWithParam(id, type) {
    return _.find(this.history[type], ['id', Number(id)]);
  }

  /*
    Confirmed entertainers
  */
  fetchEntertainersConfirmed() {
    /*
    ToDo: fetch from server
     */
    this.entertainersConfirmedCount = 2;
    return this.listConfirmed = [{
        id: 1,
        name: 'Elaize',
        photo: '/assets/images/photos/photo3.png'
    }/*,{
        id: 2,
        name: 'Sundra',
        photo: '/assets/images/photos/photo3.png'
    }*/]
  }

  getEntertainersConfirmed() {
    return this.listConfirmed;
  }

  /*
    Invited entertainers count
  */
  fetchEntertainersInvitedCount() {
    /*
    ToDo: fetch from server
     */
    return this.entertainersInvitedCount = 1;
  }

  getEntertainersInvitedCount() {
    return this.entertainersInvitedCount;
  }

  /*
    Confirmed entertainers count
  */
  fetchEntertainersConfirmedCount() {
    /*
    ToDo: fetch from server
     */
    return this.entertainersConfirmedCount = 2;
  }

  getEntertainersConfirmedCount() {
    return this.entertainersConfirmedCount;
  }

  buildOrder (form) {
    return {
      service_type: Number(_.head(this.Helper.getActiveObjectFromArray(this.getProviders())).type),
      length: parseFloat(form.hour).toString(),
      location: form.geo.location.formatted_address,
      coordinates: {
        lat: form.geo.coords.latitude.toString(),
        long: form.geo.coords.longitude.toString()
      },
      location_notes: form.notes ? form.notes : '',
      apartment: form.apt,
      asap: form.asap,
      datetime: form.asap ?
        this.moment() :
        this.moment(new Date(this.moment(form.date).format('YYYY/MM/DD') + ' ' + form.time)),
      entertainers_number: Number(form.entertainer),
      guests_number: form.guest.toString(),
      cost: form.price.toString()
    }
  }


  fetchOrderDetails(orderId) {
/*    return this
      .Request
      .send(
        null,
        this.Constants.api.orderDetails.method,
        this.Constants.api.orderDetails.uri(orderId)
      )
      .then(
        result => {
          return result.data;
        },
        error => console.log(error)
      );*/
    /*
    ToDo: replace with real server request
     */
    return new Promise((resolve, reject) => {
          this.orderDetails = Object.assign(this.orderDetails, {
            service_type: 1,
            minx_count: 4,
            rate: 125,
            booking_length: '1h 30m',
            address: 'Santa Monica Fwy 1110',
            apartment: 12,
            cost: 250
          });

        setTimeout(() => {
          resolve(this.orderDetails);
        }, 1000);
    })
  }
}
