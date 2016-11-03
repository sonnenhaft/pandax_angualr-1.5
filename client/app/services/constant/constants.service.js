var config = require('config');

export default class Constants {

  constructor ($window) {
    'ngInject';

    _.assign(this, {$window});

    this.profile = this.profileConstants();
    this.user = this.userConstants();
    this.order = this.orderConstants();
    this.map = this.mapConstants();
    this.billing = this.billingConstants();
    this.api = this.apiConstants();
    this.terms = this.termsConstants();
    this.admin = this.adminConstants();
  }

  apiConstants () {
    const path = config.API_URL,
          pathWS = config.WS_URL;

    let apiConstants = {

      login: {
        uri: path + '/sessions',
        method: 'POST'
      },

      signup: {
        uri: user => path + '/signup/' + user, // user is a type of user,
        method: 'POST'
      },

      password: {
        restore: {
          uri: path + '/sessions/password/reset',
          method: 'POST'
        },
        change: {
          uri: token => path + '/sessions/password/' + token,
          method: 'PUT'
        },
        changeByOld: {
          uri: () => path + '/password/change',
          method: 'POST'
        }
      },

      profile: {
        uri: user => path + '/' + user + '/profile', // user is a type of user,
        method: {
          PUT: 'PUT', // to update profile
          GET: 'GET' // to get profile information
        }
      },

      photo: {
        uri: (user, slot_id) => path + '/' + user + '/profile/photo' + (user === 'provider' ? '/' + slot_id : ''), // slot_id is an index of photo,
        method: 'PUT'
      },

      order: {
        uri: path + '/order',
        method: 'POST'
      },

      service: {
        uri: user => path + `/${user}/service-types`,
        method: 'GET'
      },

      searchEntertainers: {
        uri: (orderId) => path + `/orders/${orderId}/entertainers/search`,
        method: 'GET'
      },

      orderDetails: {
        uri: (orderId, include) => path + `/orders/${orderId}` + (!!include ? `?include=${include}` : ''),
        method: 'GET'
      },

      cards: {
        add: {
          uri: user => `${path}/${user}/cards/add`,
          method: 'POST'
        },
        get: {
          uri: user => `${path}/${user}/cards`,
          method: 'GET'
        },
        delete: {
          uri: (user, cardId) => `${path}/${user}/cards/${cardId}`,
          method: 'DELETE'
        },
        setDefault: {
          uri: (user, cardId) => `${path}/${user}/cards/${cardId}/default`,
          method: 'PUT'
        }
      },

      inviteEntertainer: {
        uri: (orderId, entertainerId) => path + `/orders/${orderId}/entertainers/${entertainerId}/invite`,
        method: 'POST'
      },

      ws: {
        invites: {
          uri: (channelName) => pathWS + `/orders/${channelName}/invites`
        }
      },

      invitedEntertainers: {
        uri: (orderId) => path + `/customer/orders/${orderId}/invites`,
        method: 'GET'
      },

      cancelEntertainerByCustomer: {
        uri: (inviteId) => path + `/invite/${inviteId}/cancel`,
        method: 'PUT'
      },

      orderFutures: {
        uri: (user, page = 1) => path + `/${user}/orders?page=${page}&status[]=accepted&status[]=in+progress&include=invites`,
        method: 'GET'
      },

      orderHistory: {
        uri: (user, page = 1) => {
          let result = path + `/${user}/orders/history?page=${page}&include=invites`;
/*        if (user == 'customer') {
            result += `?page=${page}&status[]=finished&status[]=canceled&include=invites`;
          } else {
            result += `/history?page=${page}`;
          }*/
          return result;
        },
        method: 'GET'
      },

      confirmedEntertainers: {
        uri: (orderId) => path + `/customer/orders/${orderId}/invites?status[]=accepted&status[]=canceled`,
        method: 'GET'
      },

      entertainers: {
        get: {
          uri: (page = 1) => path + `/provider?page=${page}`,
          method: 'GET'
        }
      },

      customers: {
        get: {
          uri: (page = 1) => path + `/admin/customers?page=${page}`,
          method: 'GET'
        }
      },

      admin: {
        setStatus: {
          uri: (role, userId) => path + `/admin/${role}/${userId}/status`,
          method: 'POST'
        }
      },

      lastNotAccomplishedOrder: {
        uri: (user) => path + `/${user}/orders/last-not-accomplished`,
        method: 'GET'
      },

      payForOrder: {
        uri: (user, orderId) => path + `/${user}/orders/${orderId}/pay`,
        method: 'POST'
      },

      actualStatusOfCurrentUser: {
        uri: path + '/status',
        method: 'GET'
      },

      orders: {
        getAll: {
          uri: (role, page = 1) => path + `/${role}/orders?page=${page}`,
          method: 'GET'
        },
        getOne: {
          uri: (role, orderId) => path + `/${role}/orders/${orderId}?include=invites`,
          method: 'GET'
        }
      },

      cancelOrder: {
        uri: (role, orderId) => path + `/${role}/orders/${orderId}/complete`,
        method: 'POST'
      }

    };

    return apiConstants;
  }

  mapConstants () {
    const mapConstants = {

      options: {
        disableDefaultUI: false,
        streetViewControl: false,
        mapTypeControl: false
      },

      position: {
        default: {
          location: {
            latitude: 35.5375307,
            longitude: -100.0695645
          },
          zoom: 3
        }
      },

      styles: [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":-50},{"gamma":0},{"hue":"#bdbdca"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#a0a0ac"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}]

    };

    return mapConstants;
  }

  orderConstants () {
    const orderConstants = {

      models: {
        date: new Date(),
        currentDate: new Date(),
        entertainers: _.range(1, 7),
        entertainer: function () {
          this.entertainer = _.head(this.entertainers);
          return this;
        },
        hours: ['0.5 H', '1 H', '1.5 H', '2 H', '2.5 H', '3 H', '3.5 H', '4 H'],
        hour: function () {
          this.hour = _.head(this.hours);
          return this;
        },
        guests: ['1', '2-3', '4-5', '5-10', '10-15', '15+'],
        guest: 1,
        asap: true
      }.hour().entertainer(),

      statuses: {
        accepted: 'accepted',
        canceled: "canceled",
        declined:  "declined",
        invited:  "invited",
        inProgress:  "in progress",
        finished:  "finished`",
        missed:  "missed",
        new:  "new",
        paid:  "paid",
        canceled: "canceled",
        active: "active",
        canceledbyProvider: "canceled_by_provider",
        canceledbyCustomer: "canceled_by_customer",
      },

      statusesViewCorrection: {canceled_by_provider: 'canceled by entertainer', canceled_by_customer: 'canceled by customer'},

      entertainersCountInfo: 'Just trying to get to know you better for the safety of our Minx.',

      cancelEntertainerMessage: (penaltyAmount) => penaltyAmount > 0 ?
        `Canceling the order will cost $ ${penaltyAmount} penalty. Are you sure want to cancel order for the minx?` :
        'Are you sure want to cancel order for the minx?',

      // time to cancel entertainer by customer without penalty in minutes
      timeToCleanCancel: 5,

      moneyReservationFailedMessage: {
        title: 'Money reservation failed',
        content: 'Money capture failed. Please try another card.'
      },

      maxPeriodForCreating: {
        value: 14,
        key: 'days'
      },

      cancelOrderMessages: [{
        title: 'Cancel order',
        content: 'Are you sure want to cancel order?'
      },{
        title: 'Cancel unconfirmed invites',
        content: 'Are you sure want to cancel unconfirmed invites and cancel order?'
      },{
        title: 'Cancel unconfirmed invites',
        content: 'Are you sure want to cancel unconfirmed invites and complete this order? <br/> \
                 Note: We will do a refund of the money that you paid for unconfirmed entertainers'
      }],

    };

    return orderConstants;
  }

  termsConstants () {
    const termsConstants = [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    ];

    return termsConstants;
  }

  userConstants () {
    const userConstants = {

      avatar: {
        empty: '../assets/images/avatar.png'
      },

      navigation: [
        {
          role: ['customer'],
          text: 'Create order',
          url: 'main.order'
        },
        {
          role: ['provider'],
          text: 'Order History',
          url: 'main.history'
        },
        {
          role: ['customer'],
          text: 'Orders',
          url: 'main.history'
        },
        {
          role: ['customer'],
          text: 'Contact Us',
          url: 'contact'
        },
        {
          role: ['customer', 'provider'],
          text: 'Settings',
          url: ''
        },
        {
          role: ['admin'],
          text: 'Dashboard',
          url: 'admin.dashboard',
          icon: {
            path: '/assets/images/icons/svg/navbar-admin/icon_dashboard.svg',
            styles: {
              height: '14px',
              width: '17px'
            }
          },
          hint: 'Dashboard'
        },
        {
          role: ['admin'],
          text: 'Entertainers',
          url: 'admin.entertainers',
          icon: {
            path: '/assets/images/icons/svg/navbar-admin/icon_providers.svg',
            styles: {
              height: '17px',
              width: '12px'
            }
          },
          hint: 'Entertainers'
        },
        {
          role: ['admin'],
          text: 'Customers',
          url: 'admin.customers',
          icon: {
            path: '/assets/images/icons/svg/navbar-admin/icon_customers.svg',
            styles: {
              height: '17px',
              width: '10px'
            }
          },
          hint: 'Customers'
        },
        {
          role: ['admin'],
          text: 'Orders',
          url: 'admin.orders',
          icon: {
            path: '/assets/images/icons/svg/navbar-admin/icon_orders.svg',
            styles: {
              height: '15px',
              width: '12px'
            }
          },
          hint: 'Orders'
        },
/*        {
          role: ['admin'],
          text: 'Paysheet',
          url: 'admin.paysheet',
          icon: {
            path: '/assets/images/icons/svg/navbar-admin/icon_paysheet.svg',
            styles: {
              height: '12px',
              width: '18px'
            }
          }
        },*/
        {
          role: ['admin'],
          text: 'Log Out',
          url: 'admin.logout',
          icon: {
            path: '/assets/images/icons/svg/navbar-admin/icon_exit.svg',
            styles: {
              height: '16px',
              width: '16px'
            }
          },
          hint: 'Logout',
          bottom: true
        }
      ],

      submenu: [
        {
          role: ['customer', 'provider'],
          parent: 'Settings',
          text: 'Payments',
          url: 'main.payments'
        },
        {
          role: ['customer'],
          parent: 'Settings',
          text: 'Terms',
          url: 'settings.terms'
        },
        {
          role: ['customer', 'provider'],
          parent: 'Settings',
          text: 'Change Password',
          url: 'main.password'
        },
        {
          role: ['customer'],
          parent: 'Settings',
          text: 'Edit profile',
          url: "main.profile.view({mode: 'profile.edit'})"
        },
        {
          role: ['provider'],
          parent: 'Settings',
          text: 'View profile',
          url: "main.profile.view"
        },
        {
          role: ['customer'],
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
                type: 'text',
                desc: "We won't display your last name"
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
      }.provider(),

      defaultCurrency: 'usd'

    };

    return billingConstants;
  }

  adminConstants () {
    const adminConstants = {

      statuses: {
        entertainer: {
          accepted: "accepted",
          active: "active",
          approved: "approved",
          blocked: "blocked",
          offline:  "offline",
          pending:  "pending",
          rejected:  "rejected",
          unblocked: "unblocked",
        },
        customer: {
          active: "active",
          blocked: "blocked",
          unblocked: "unblocked",
        }
      },

      setStatusMessage: {
        // substring to remove 'ed' in the end of status name
        title: (role, targetStatus) => {
          return `${this.admin.getCorrectStatusName(targetStatus)} ${role}`;
        },
        content: (role, targetStatus) => {
          return `Are you sure want to ${this.admin.getCorrectStatusName(targetStatus, false)} the ${role}?`;
        }
      },

      getCorrectStatusName (status, isCapitalize = true) {
        let statusResult = status.substr(0, 1);

        if (isCapitalize) {
          statusResult = status.substr(0, 1).toUpperCase();
        }

        switch (status) {
          case 'active':
            statusResult += status.substr(1);
            break;
          case 'approved':
            statusResult += status.substr(1, status.length - 2);
            break;
          default:
            statusResult += status.substr(1, status.length - 3);
        }

        return statusResult;
      }
    };

    return adminConstants;
  }
}
