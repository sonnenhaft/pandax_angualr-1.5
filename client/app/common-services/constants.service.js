import angular from 'angular';
import config from 'config'

/** @deprecated */
class Constants {
  constructor($window) {
    'ngInject';

    this.$window = $window;
    this.order = this.orderConstants();
    this.billing = this.billingConstants();
    this.api = this.apiConstants();
    this.admin = this.adminConstants();
  }

  apiConstants() {
    const path = config.API_URL;
    var pathWS = config.WS_URL;

    return {
      login: { method: 'POST', uri: path + '/sessions' },
      signup: { method: 'POST', uri: user => path + '/signup/' + user }, // user is a type of user,
      password: {
        restore: { method: 'POST', uri: path + '/sessions/password/reset' },
        change: { method: 'PUT', uri: token => path + '/sessions/password/' + token },
        changeByOld: { method: 'POST', uri: () => path + '/password/change' }
      },
      profile: {
        method: {
          PUT: 'PUT', // to update profile
          GET: 'GET' // to get profile information
        },
        uri: user => path + '/' + user + '/profile', // user is a type of user
      },
      photo: { method: 'PUT', uri: (user, slot_id) => path + '/' + user + '/profile/photo' + (user === 'provider' ? '/' + slot_id : ''), }, // slot_id is an index of photo,
      order: { method: 'POST', uri: path + '/order' },
      service: { method: 'GET', uri: user => path + `/${user}/service-types` },
      searchEntertainers: { method: 'GET', uri: (orderId) => path + `/orders/${orderId}/entertainers/search` },
      orderDetails: { method: 'GET', uri: (orderId, include) => path + `/orders/${orderId}` + (!!include ? `?include=${include}` : '') },
      cards: {
        add: { method: 'POST', uri: user => `${path}/${user}/cards/add` },
        get: { method: 'GET', uri: user => `${path}/${user}/cards` },
        delete: { method: 'DELETE', uri: (user, cardId) => `${path}/${user}/cards/${cardId}` },
        setDefault: { method: 'PUT', uri: (user, cardId) => `${path}/${user}/cards/${cardId}/default` }
      },
      inviteEntertainer: { method: 'POST', uri: (orderId, entertainerId) => path + `/orders/${orderId}/entertainers/${entertainerId}/invite` },
      ws: { invites: { uri: (channelName) => pathWS + `/orders/${channelName}/invites` } },
      invitedEntertainers: { method: 'GET', uri: (orderId) => path + `/customer/orders/${orderId}/invites` },
      cancelEntertainerByCustomer: { method: 'PUT', uri: (inviteId) => path + `/invite/${inviteId}/cancel` },
      orderFutures: { method: 'GET', uri: (user, page = 1) => path + `/${user}/orders?page=${page}&status[]=accepted&status[]=in+progress&include=invites` },
      orderHistory: {
        method: 'GET',
        uri: (user, page = 1) => {
          let result = path + `/${user}/orders/history?page=${page}&include=invites`;
          /*        if (user == 'customer') {
           result += `?page=${page}&status[]=finished&status[]=canceled&include=invites`;
           } else {
           result += `/history?page=${page}`;
           }*/
          return result;
        }
      },
      confirmedEntertainers: { method: 'GET', uri: (orderId) => path + `/customer/orders/${orderId}/invites?status[]=accepted&status[]=canceled` },
      entertainers: { get: { method: 'GET', uri: (page = 1) => path + `/provider?page=${page}` } },
      customers: { get: { method: 'GET', uri: (page = 1) => path + `/admin/customers?page=${page}` } },
      admin: { setStatus: { method: 'POST', uri: (role, userId) => path + `/admin/${role}/${userId}/status` } },
      lastNotAccomplishedOrder: { method: 'GET', uri: (user) => path + `/${user}/orders/last-not-accomplished` },
      payForOrder: { method: 'POST', uri: (user, orderId) => path + `/${user}/orders/${orderId}/pay` },
      actualStatusOfCurrentUser: { method: 'GET', uri: path + '/status' },
      orders: {
        getAll: { method: 'GET', uri: (role, page = 1) => path + `/${role}/orders?page=${page}` },
        getOne: { method: 'GET', uri: (role, orderId) => path + `/${role}/orders/${orderId}?include=invites` }
      },
      cancelOrder: { method: 'POST', uri: (role, orderId) => path + `/${role}/orders/${orderId}/complete` }
    };
  }

  orderConstants() {
    return {
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
        declined: 'declined',
        invited: 'invited',
        inProgress: 'in progress',
        finished: 'finished`',
        missed: 'missed',
        new: 'new',
        paid: 'paid',
        canceled: 'canceled',
        active: 'active',
        canceledbyProvider: 'canceled_by_provider',
        canceledbyCustomer: 'canceled_by_customer',
      },

      statusesViewCorrection: { canceled_by_provider: 'canceled by entertainer', canceled_by_customer: 'canceled by customer' },

      entertainersCountInfo: 'Just trying to get to know you better for the safety of our Minx.',

      cancelEntertainerMessage: (penaltyAmount) => penaltyAmount > 0 ?
        `Canceling the order will cost $ ${penaltyAmount} penalty. Are you sure want to cancel order for the minx?` :
        'Are you sure want to cancel order for the minx?',

      // time to cancel entertainer by customer without penalty in minutes
      timeToCleanCancel: 5,

      moneyReservationFailedMessage: { title: 'Money reservation failed', content: 'Money capture failed. Please try another card.' },
      maxPeriodForCreating: { value: 14, key: 'days' },

      cancelOrderMessages: [
        { title: 'Cancel order', content: 'Are you sure want to cancel order?' },
        { title: 'Cancel unconfirmed invites', content: 'Are you sure want to cancel unconfirmed invites and cancel order?' },
        {
          title: 'Cancel unconfirmed invites',
          content: `
            Are you sure want to cancel unconfirmed invites and complete this order? 
            <br/> \ Note: We will do a refund of the money that you paid for 
            unconfirmed entertainers`
        }
      ],

    };
  }

  billingConstants() {
    return {
      fields: {
        customer: [
          {
            combined: [
              { name: 'First Name', model: 'first_name', type: 'text' },
              { name: 'Last Name', model: 'last_name', type: 'text' }
            ]
          },
          { name: 'Phone Number', model: 'phone', type: 'tel' }
        ],
        provider: function () {
          this.provider = _.union(
            [{ name: 'Display Name', model: 'displaying_name', type: 'text' }],
            this.customer
          );
          return this;
        }
      }.provider(),

      defaultCurrency: 'usd'

    };
  }

  adminConstants() {
    return {

      statuses: {
        entertainer: {
          accepted: 'accepted',
          active: 'active',
          approved: 'approved',
          blocked: 'blocked',
          offline: 'offline',
          pending: 'pending',
          rejected: 'rejected',
          unblocked: 'unblocked',
        },
        customer: {
          active: 'active',
          blocked: 'blocked',
          unblocked: 'unblocked',
        }
      },

      // substring to remove 'ed' in the end of status name
      setStatusMessage: {
        title: (role, targetStatus) => `${this.admin.getCorrectStatusName(targetStatus)} ${role}`,
        content: (role, targetStatus) => `Are you sure want to ${this.admin.getCorrectStatusName(targetStatus, false)} the ${role}?`
      },

      getCorrectStatusName (status, isCapitalize = true) {
        let statusResult = status.substr(0, 1);

        if (isCapitalize) {
          statusResult = status.substr(0, 1).toUpperCase();
        }

        switch ( status ) {
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
  }
}

/** @deprecated */
export default angular.module('constant', []).service('Constants', Constants).name;
