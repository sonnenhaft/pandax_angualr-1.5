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
    const path = 'http://dev3.panda.aws.isdev.info/api';

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
          PUT: 'PUT', // to update profile
          GET: 'GET' // to get profile information
        }
      },

      photo: {
        uri: (user, slot_id) => {
          return path + '/' + user + '/profile/photo' + (user === 'provider' ? '/' + slot_id : ''); // slot_id is an index of photo
        },
        method: 'PUT'
      },

      order: {
        uri: path + '/order',
        method: 'POST'
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
          role: 'customer',
          text: 'Create order',
          url: 'main.order'
        },
        {
          role: 'customer',
          text: 'Active orders',
          url: 'home'
        },
        {
          role: 'customer',
          text: 'History',
          url: 'home'
        },
        {
          role: 'customer',
          text: 'Contact Us',
          url: 'contact'
        },
        {
          role: 'customer',
          text: 'Settings',
          url: ''
        }
      ],

      submenu: [
        {
          role: 'customer',
          parent: 'Settings',
          text: 'Payments',
          url: 'settings.payment'
        },
        {
          role: 'customer',
          parent: 'Settings',
          text: 'Terms',
          url: 'settings.terms'
        },
        {
          role: 'customer',
          parent: 'Settings',
          text: 'Change Password',
          url: 'profile.edit'
        },
        {
          role: 'customer',
          parent: 'Settings',
          text: 'Edit profile',
          url: 'profile.view'
        },
        {
          role: 'customer',
          parent: 'Settings',
          text: 'Log out',
          url: 'settings.logout'
        }
      ]

    };

    return userConstants;
  }

  profileConstants () {
    const profileConstants = {

      serviceTypes: [
        {
          type: '3',
          name: 'Dancer',
          price: 200,
          description: 'Your Minx will be topless, give lap dances, serve drinks, and socialize.',
          img: '/assets/images/services/dancer.png',
          active: false
        },
        {
          type: '2',
          name: 'Hostess',
          price: 125,
          description: 'Your Minx will be topless, serve drinks, and socialize',
          img: '/assets/images/services/hostess.png',
          active: false
        },
        {
          type: '1',
          name: 'Party Girl',
          price: 50,
          description: 'Your Minx will be fun and flirtatious while fully clothed. She will serve drinks and socialize.',
          img: '/assets/images/services/girl.png',
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
