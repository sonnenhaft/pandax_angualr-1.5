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
        moment
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
    return _.sortBy(this.history.past, order => order.datetime);
  }

  getFutureOrders() {
    return _.sortBy(this.history.future, order => order.datetime);
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
}
