export default class Constants {

  constructor () {

    this.profile = this.profileConstants();
    this.user = this.userConstants();
    this.order = this.orderConstants();
    this.map = this.mapConstants();
    this.billing = this.billingConstants();

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
          url: 'profile.edit'
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
          type: '1',
          name: 'Party Girl',
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
          name: 'Dancer',
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

  billingConstants () {
    const billingConstants = {

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

    return billingConstants;
  }

}
