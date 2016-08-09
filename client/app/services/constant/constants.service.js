export default class Constants {

  constructor () {
    'ngInject';

    this.profile = this.profileConstants();
    this.user = this.userConstants();
    this.order = this.orderConstants();
    this.map = this.mapConstants();
    this.api = this.apiConstants();

  }

  apiConstants () {
    const path = 'http://panda-dev.aws.isdev.info/api';

    let apiConstants = {

      login: {
        uri: path + '/sessions',
        method: 'POST'
      },

      signup: {
        uri: user => {
          return path + '/signup/' + user; // user is a type of user
        },
        method: 'POST'
      },

      profile: {
        uri: user => {
          return path + '/' + user + '/profile'; // user is a type of user
        },
        method: {
          PATH: 'PATH', // to update profile
          GET: 'GET' // to get profile information
        }
      },

      photo: {
        uri: slot_id => {
          return path + '/' + this.User.get('role') + '/profile/photo/' + slot_id; // slot_id is an id of user
        },
        method: 'PUT'
      }

    };

    return apiConstants;
  }

  mapConstants () {
    const mapConstants = {

      position: {
        default: {
          location: {
            latitude: 35.5375307,
            longitude: -100.0695645
          },
          zoom: 3
        }
      },

      styles: [
        {
          stylers: [
            { hue: '#890000' },
            { visibility: 'simplified' },
            { gamma: 0.5 },
            { weight: 0.5 }
          ]
        },
        {
          featureType: 'water',
          stylers: [
            { color: '#ba192f' }
          ]
        }
      ]

    };

    return mapConstants;
  }

  orderConstants () {
    const orderConstants = {

      models: {
        providers: _.reverse(this.profile.serviceTypes),
        date: new Date(),
        currentDate: new Date(),
        entertainers: _.range(1, 7),
        entertainer: 1,
        hours: ['0.5 H', '1 H', '1.5 H', '2 H', '2.5 H', '3 H', '3.5 H', '4 H'],
        hour: '0.5 H',
        guests: ['1', '2-3', '4-5', '5-10', '10-15'],
        guest: 1,
        asap: true
      }

    };

    return orderConstants;
  }

  userConstants () {
    const userConstants = {

      avatar: {
        empty: '../assets/images/avatar.png'
      },

      navigation: [
        {
          text: 'Create order',
          url: 'main.order'
        },
        {
          text: 'Active orders',
          url: 'home'
        },
        {
          text: 'History',
          url: 'home'
        },
        {
          text: 'Profile',
          url: 'profile.view'
        },
        {
          text: 'Payment',
          url: 'home'
        }
      ],

      additionally: [
        {
          text: 'Terms',
          url: 'home'
        },
        {
          text: 'Contacts',
          url: 'home'
        },
        {
          text: 'Change password',
          url: 'home'
        }
      ]

    };

    return userConstants;
  }

  profileConstants () {
    const profileConstants = {

      serviceTypes: [
        {
          type: '1',
          name: 'Dancer',
          price: 200,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, deleniti doloremque harum magnam maxime neque omnis? Delectus enim fuga quod tenetur! Aut dolore dolorum earum eos eveniet omnis saepe voluptatum!',
          img: '/assets/images/services/prime_xx.png',
          active: false
        },
        {
          type: '2',
          name: 'Hostess',
          price: 125,
          description: '',
          img: '/assets/images/services/prime.png',
          active: false
        },
        {
          type: '3',
          name: 'Party Girl',
          price: 50,
          description: '',
          img: '/assets/images/services/prime.png',
          active: false
        }
      ],

      images: {
        customer: [{file: ''}],
        provider: [
          {file: ''},
          {file: ''},
          {file: ''}
        ]
      },

      fields: {
        customer: [
          {
            combined: [
              {
                name: 'First Name',
                model: 'first_name',
                type: 'text'
              },
              {
                name: 'Last Name',
                model: 'last_name',
                type: 'text'
              }
            ]
          },
          {
            name: 'Phone Number',
            model: 'phone',
            type: 'tel'
          },
          {
            name: 'Email',
            model: 'email',
            type: 'email'
          }
        ],
        provider: function () {
          this.provider = _.union([
            {
              name: 'Display Name',
              model: 'displaying_name',
              type: 'text'
            }
          ], this.customer);
          return this;
        }
      }.provider()

    };

    return profileConstants;
  }

}
