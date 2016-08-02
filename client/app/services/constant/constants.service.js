export default class Constants {

  constructor () {

    this.profile = this.profileConstants();
    this.user = this.userConstants();
    this.order = this.orderConstants();
    this.map = this.mapConstants();

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

      fields: {
        location: [
          {
            name: 'Location',
            model: 'location',
            type: 'text',
            flex: 80
          },
          {
            name: 'Apt',
            model: 'apt',
            type: 'text',
            flex: 20
          }
        ],
        date: [
          {
            name: 'Time',
            model: 'datepicker',
            minDate: new Date()
          },
          {
            model: 'time',
            value: {}
          }
        ]
      }

    };

    return orderConstants;
  }

  userConstants () {
    const userConstants = {

      avatar: {
        empty: '/assets/images/avatar.png'
      },

      navigation: [
        {
          text: 'Make order',
          url: 'main.order'
        },
        {
          text: 'Active orders',
          url: ''
        },
        {
          text: 'History',
          url: ''
        },
        {
          text: 'Profile',
          url: 'profile.create'
        },
        {
          text: 'Payment',
          url: ''
        }
      ],

      additionally: [
        {
          text: 'Terms',
          url: ''
        },
        {
          text: 'Contacts',
          url: ''
        },
        {
          text: 'Change password',
          url: ''
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
          name: 'Prime XX',
          price: 250,
          description: '',
          img: '/assets/images/services/prime_xx.png',
          active: false
        },
        {
          type: '2',
          name: 'Prime X',
          price: 150,
          description: '',
          img: '/assets/images/services/prime.png',
          active: false
        },
        {
          type: '3',
          name: 'Prime',
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
