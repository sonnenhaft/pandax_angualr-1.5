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
        historyProvider: {},
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


  fetchProviderPastOrders () {
    return new Promise((resolve, reject) => {
        this.historyProvider = {
          past: [
            {
              id: 1,
              customer: {
                photo: '/assets/images/photos/photo2-3x.png',
                name: 'Daniel',
                tel: "+ 9246 3415 5314",
                rating: 5
              },
              datetime: this.moment(new Date('08-24-2016 15:00')),
              service_type: 1,
              address: 'Santa Monica Fwy 2222',
              guests: 3,
              duration: '1h 30m',
              initial_price: 250
            },
            {
              id: 2,
              customer: {
                photo: '/assets/images/photos/photo3-3x.png',
                name: 'Daniel 2',
                tel: "+ 9246 3415 5314",
                rating: 5
              },
              datetime: this.moment(new Date('07-21-2016 12:30')),
              service_type: 3,
              address: '365 W Craig Rd #123, North Las Vegas, NV 89032, USA',
              guests: 1,
              duration: '2h',
              initial_price: 800
            }
          ],
          future: [
            {
              id: 1,
              datetime: this.moment(new Date('09-10-2016 18:30')),
              service_type: 1,
              address: 'Santa Monica Fwy 1110',
              guests: 3,
              duration: '1h 30m',
              initial_price: 250,
              provider: [
                {
                  name: 'Agnes',
                  duration: '1h 30m',
                  price: 100,
                  img: ''
                },
                {
                  name: 'Kimberly',
                  duration: null,
                  price: 50,
                  img: ''
                },
                {
                  name: 'Rebecca',
                  duration: null,
                  price: 0,
                  img: ''
                },
                {
                  name: 'Agnes',
                  duration: '1h 30m',
                  price: 100,
                  img: ''
                },
                {
                  name: 'Agnes',
                  duration: '45m',
                  price: 100,
                  img: ''
                }
              ]
            },
            {
              id: 2,
              active: true,
              datetime: new Date(),
              service_type: 3,
              address: '365 W Craig Rd #123, North Las Vegas, NV 89032, USA',
              guests: 1,
              duration: '2h',
              initial_price: 800,
              provider: [
                {
                  name: 'Lil',
                  duration: '2h',
                  price: 400,
                  img: ''
                },
                {
                  name: 'Sara',
                  duration: '2h',
                  price: 200,
                  img: ''
                }
              ]
            },
            {
              id: 3,
              asap: true,
              datetime: new Date(),
              service_type: 2,
              address: '1, 22262 Mission Blvd, Hayward, CA 94541, USA',
              guests: '2-3',
              duration: '1h',
              initial_price: 250,
              provider: [
                {
                  name: 'Lil',
                  duration: '1h',
                  price: 125,
                  img: ''
                },
                {
                  name: 'Sara',
                  duration: '1h',
                  price: 125,
                  img: ''
                }
              ]
            }
          ]
        };

        setTimeout(() => {
          resolve(this.historyProvider);
        }, 4000);
    })


  }

  getProviderPastOrders () {
    return _.orderBy(this.historyProvider.past, order => order.datetime, 'desc');
  }

  inviteEntertainer (orderId, entertainerId) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.inviteEntertainer.method,
        this.Constants.api.inviteEntertainer.uri(orderId, entertainerId)
      )
      .then(
        result => {
          this.entertainersInvitedCount = result.data.invitations_count;
          return result.data;
        },
        error => console.log(error)
      );
  }
}
