export default class Resolve {

  constructor (User, OrderService, Constants, Request, moment, $timeout) {
    'ngInject';

    _.assign(this, {
      User,
      OrderService,
      Constants,
      Request,
      moment,
      $timeout
    });

  }

  billing () {
    return this
      .Request
      .send(
        this.User.token(),
        this.Constants.api.cards.get.method,
        this.Constants.api.cards.get.uri(this.User.get('role'))
      )
      .then(
        cards => {
          return {
            first_name: this.User.get('first_name'),
            last_name: this.User.get('last_name'),
            mobile: this.User.get('phone'),
            cards: cards.data
          };
        },
        error => console.log(error)
      )
      .then(billingInfo => this.User.billingInfo = billingInfo);
  }

  providers () {
    return this
      .Request
      .send(
        this.User.token(),
        this.Constants.api.service.method,
        this.Constants.api.service.uri
      )
      .then(
        result => {
          return _.map(result.data, provider => {
            return _.assign(provider, {
              price: _.round(provider.price),
              img: require('../../../assets/images/services/' + provider.name.toLowerCase().replace(/\s+/g, '_') + '.png')
            });
          });
        },
        error => console.log(error)
      )
      .then(providers => this.OrderService.providers = providers);
  }

  history () {
    //TODO: Replace with real data from server
    this.OrderService.history = {
      past: [
        {
          id: 1,
          datetime: this.moment(new Date('08-24-2016 15:00')),
          service_type: 1,
          address: 'Santa Monica Fwy 1110',
          guests: 3,
          duration: '1h 30m',
          initial_price: 250,
          final_price: 250,
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
              img: '',
              rejected: true
            },
            {
              name: 'Rebecca',
              duration: null,
              price: 0,
              img: '',
              declined: true
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
          datetime: this.moment(new Date('07-21-2016 12:30')),
          service_type: 3,
          address: '365 W Craig Rd #123, North Las Vegas, NV 89032, USA',
          guests: 1,
          duration: '2h',
          initial_price: 800,
          final_price: 600,
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
  }

}
