import config from 'config';

/** @deprecated */
const Constants = {
  /** @deprecated */
  api: {
    password: {
      changeByOld: { method: 'POST', uri: ( ) => `${config.API_URL}/api/password/change` }
    },
    profile: {
      method: {
        PUT: 'PUT', // to update profile
        GET: 'GET' // to get profile information
      },
      uri: user => `${config.API_URL}/api/${user}/profile`, // user is a type of user
    },
    photo: { method: 'PUT', uri: (user, slotId) => `${config.API_URL}/api/${user}/profile/photo${user === 'provider' ? `/${slotId}` : ''}`, }, // slotId is an index of photo,
    order: { method: 'POST', uri: `${config.API_URL}/api/order` },
    service: { method: 'GET', uri: user => `${config.API_URL}/api/${user}/service-types` },
    searchEntertainers: { method: 'GET', uri: orderId => `${config.API_URL}/api/orders/${orderId}/entertainers/search` },
    orderDetails: { method: 'GET', uri: (orderId, include) => `${config.API_URL}/api/orders/${orderId}${include ? `?include=${include}` : ''}` },
    cards: {
      add: { uri: user => `${config.API_URL}/api/${user}/cards/add` },
      get: { method: 'GET', uri: user => `${config.API_URL}/api/${user}/cards` },
      delete: { uri: (user, cardId) => `${config.API_URL}/api/${user}/cards/${cardId}` },
      setDefault: { uri: (user, cardId) => `${config.API_URL}/api/${user}/cards/${cardId}/default` }
    },
    inviteEntertainer: { method: 'POST', uri: (orderId, entertainerId) => `${config.API_URL}/api/orders/${orderId}/entertainers/${entertainerId}/invite` },
    ws: { invites: { uri: channelName => `${config.WS_URL}/orders/${channelName}/invites` } },
    invitedEntertainers: { method: 'GET', uri: orderId => `${config.API_URL}/api/customer/orders/${orderId}/invites` },
    cancelEntertainerByCustomer: { method: 'PUT', uri: inviteId => `${config.API_URL}/api/invite/${inviteId}/cancel` },
    orderFutures: {
      method: 'GET', uri: (user, page = 1) => `${config.API_URL}/api/${user}/orders?page=${page}&status[]=accepted&status[]=in+progress&include=invites`
    },
    orderHistory: {
      method: 'GET',
      uri: (user, page = 1) => `${config.API_URL}/api/${user}/orders/history?page=${page}&include=invites`
    },
    confirmedEntertainers: { method: 'GET', uri: orderId => `${config.API_URL}/api/customer/orders/${orderId}/invites?status[]=accepted&status[]=canceled` },
    lastNotAccomplishedOrder: { method: 'GET', uri: user => `${config.API_URL}/api/${user}/orders/last-not-accomplished` },
    payForOrder: { method: 'POST', uri: (user, orderId) => `${config.API_URL}/api/${user}/orders/${orderId}/pay` },
    orders: {
      getAll: { method: 'GET', uri: (role, page = 1) => `${config.API_URL}/api/${role}/orders?page=${page}` },
      getOne: { method: 'GET', uri: (role, orderId) => `${config.API_URL}/api/${role}/orders/${orderId}?include=invites` }
    },
    cancelOrder: { method: 'POST', uri: (role, orderId) => `${config.API_URL}/api/${role}/orders/${orderId}/complete` }
  },
  /** @deprecated */
  order: {
    models: {
      date: new Date( ),
      currentDate: new Date( ),
      entertainers: _.range(1, 7),
      entertainer ( ) {
        this.entertainer = _.head(this.entertainers);
        return this;
      },
      hours: ['0.5 H', '1 H', '1.5 H', '2 H', '2.5 H', '3 H', '3.5 H', '4 H'],
      hour ( ) {
        this.hour = _.head(this.hours);
        return this;
      },
      guests: ['1', '2-3', '4-5', '5-10', '10-15', '15+'],
      guest: 1,
      asap: true
    }.hour( ).entertainer( ),

    entertainersCountInfo: 'Just trying to get to know you better for the safety of our Minx.',

    cancelEntertainerMessage: penaltyAmount => penaltyAmount > 0 ? // eslint-disable-line no-confusing-arrow
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
              Are you sure want to cancel unconfirmed invites and complete this order?  <br/> 
              Note: We will do a refund of the money that you paid for  unconfirmed entertainers`
      }
    ],

  },
  /** @deprecated */
  billing: {
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
      provider ( ) {
        this.provider = _.union(
          [{ name: 'Display Name', model: 'displaying_name', type: 'text' }],
          this.customer
        );
        return this;
      }
    }.provider( ),
    defaultCurrency: 'usd'
  }
};

/** @deprecated */
export default angular.module('constant', []).constant('Constants', Constants).name;
