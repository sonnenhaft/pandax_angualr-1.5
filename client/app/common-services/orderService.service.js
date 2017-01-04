import config from 'config';
import Helper from './helper.service';
import ORDER_STATUSES from '../common/ORDER_STATUSES';

class OrderService {
  static cancelOrderMessages = [
    { title: 'Cancel order', content: 'Are you sure want to cancel order?' },
    { title: 'Cancel unconfirmed invites', content: 'Are you sure want to cancel unconfirmed invites and cancel order?' },
    {
      title: 'Cancel unconfirmed invites',
      content: `
              Are you sure want to cancel unconfirmed invites and complete this order?  <br/> 
              Note: We will do a refund of the money that you paid for  unconfirmed entertainers`
    }
  ]

  list = []
  listInvited = []
  providers = []
  history = []
  historyProvider = {}
  orderDetails = {}
  listConfirmed = []
  listFutures = []

  constructor (Request, Helper, moment, WebSocket, $mdDialog, StatefulUserData) {
    'ngInject';

    Object.assign(this, { Request, Helper, moment, WebSocket, $mdDialog, StatefulUserData });
  }

  fetchEntertainers (orderId) {
    return this.Request.get(`${config.API_URL}/api/orders/${orderId}/entertainers/search`).then(
      result => this.list = result.data,
      error => console.log(error)
    );
  }

  getEntertainers ( ) {
    return this.list;
  }

  getProviders ( ) {
    return this.providers;
  }

  fetchFuturesOrders (page = 1) {
    const url = `${config.API_URL}/api/${this.StatefulUserData.getRole( )}/orders?page=${page}&status[]=accepted&status[]=in+progress&include=invites`;
    return this.Request.get(url).then(
      ({ data }) => {
        this.listFutures = data.items;
        return data;
      },
      error => console.log(error)
    );
  }

  _apiUrl (user, page) {
    return `${config.API_URL}/api/${user}/orders/history?page=${page}&include=invites`;
  }

  fetchHistoryOrders (page = 1) {
    return this.Request.get(this._apiUrl(this.StatefulUserData.getRole( ), page)).then(result => {
      this.history = result.data.items;
      return result.data;
    });
  }

  getOrdersWithParam (orderId) {
    return this.fetchOrderDetails(orderId, 'invites').then(data => data);
  }

  /*   Invited entertainers   */
  fetchEntertainersInvited (orderId) {
    return this.Request.get(`${config.API_URL}/api/customer/orders/${orderId}/invites`).then(
      result => {
        this.listInvited = result.data && result.data.items;
        this.fillConfirmedList(this.listInvited);
        return this.sortList( );
      },
      error => console.log(error)
    );
  }

  buildOrder (form) {
    return {
      service_type: Number(_.head(this.Helper.getActiveObjectFromArray(this.getProviders( ))).type),
      length: parseFloat(form.hour).toString( ),
      location: form.geo.location.formatted_address,
      coordinates: {
        lat: form.geo.coords.latitude.toString( ),
        long: form.geo.coords.longitude.toString( )
      },
      location_notes: form.notes ? form.notes : '',
      apartment: form.apt,
      asap: form.asap,
      datetime: form.asap ?
        this.moment( ) :
        this.moment(new Date(`${this.moment(form.date).format('YYYY/MM/DD')} ${form.time}`)),
      entertainers_number: Number(form.entertainer),
      guests_number: form.guest.toString( ),
      cost: form.price.toString( )
    };
  }

  fetchOrderDetails (orderId, include = '') {
    return this.Request.get(`${config.API_URL}/api/orders/${orderId}${include ? `?include=${include}` : ''}`).then(
      result => this.orderDetails = result.data,
      error => console.log(error)
    );
  }

  fetchProviderPastOrders (page = 1) {
    return this.Request.get(this._apiUrl(this.StatefulUserData.getRole( ), page)).then(
      result => {
        this.historyProvider = result.data.items;
        return result.data;
      },
      error => console.log(error)
    );
  }

  inviteEntertainer (orderId, entertainerId) {
    return this.Request.post(`${config.API_URL}/api/orders/${orderId}/entertainers/${entertainerId}/invite`).then(({ data }) => {
      this.addEntertainerToInvitedList({ id: data.invite_id, entertainerId });
      return data;
    });
  }

  addEntertainerToInvitedList (invite) {
    const entertainer = _.find(this.list, { id: invite.entertainerId });
    this.listInvited.push({ id: invite.id, provider: entertainer });
    return this.listInvited;
  }

  subcribeOnEntertainerInvite (channelName) {
    this.WebSocket.invites(channelName, this.setEntertainerStatus.bind(this));
  }

  unsubcribeOnEntertainerInvite ( ) {
    this.WebSocket.close( );
  }

  setEntertainerStatus (data) {
    const entertainer = _.find(this.listInvited, item => item.provider.id == data.provider_id);
    entertainer.status = data.action;
    entertainer.datetime = data.datetime;
    this.sortList( );
    this.fillConfirmedList([entertainer]);
  }

  sortList (list = this.listInvited) {
    list.sort((itemA, itemB) => this.moment(itemA.datetime) - this.moment(itemB.datetime));
  }

  cancelOrderForEntertainer (ev, invite, penaltyAmount) {
    return this.$mdDialog.show(this.$mdDialog.confirm( )
      .title('Cancel Minx')
      .textContent(penaltyAmount => penaltyAmount > 0 ? // eslint-disable-line no-confusing-arrow
        `Canceling the order will cost $ ${penaltyAmount} penalty. Are you sure want to cancel order for the minx?` :
        'Are you sure want to cancel order for the minx?')
      .ariaLabel('Canceling Entertainer')
      .targetEvent(ev)
      .ok('Yes')
      .cancel('No'))
      .then(data => this.Request.put(`${config.API_URL}/api/invite/${invite.id}/cancel`))
      .then(result => {
        invite.status = ORDER_STATUSES.canceledbyCustomer;
        return result;
      });
  }


  /**
   * @deprecated useless comment
   * Confirmed entertainers
   */
  fetchEntertainersConfirmed (orderId) {
    return this.Request.get(`${config.API_URL}/api/customer/orders/${orderId}/invites?status[]=accepted&status[]=canceled`).then(
      ({ data }) => {
        this.listConfirmed = data && data.items;
        return this.listConfirmed;
      },
      error => console.log(error)
    );
  }

  fetchLastNotAccomplishedOrder ( ) {
    return this.Request.get(`${config.API_URL}/api/${this.StatefulUserData.getRole( )}/orders/last-not-accomplished`).then(result => result.data);
  }

  payForOrder (orderId, cardId) {
    return this.Request.post(`${config.API_URL}/api/${this.StatefulUserData.getRole( )}/orders/${orderId}/pay`, { card_id: cardId });
  }

  cancelOrder (ev, orderId, messageType = 0) {
    const confirm = this.$mdDialog.confirm( )
      .title(OrderService.cancelOrderMessages[messageType].title)
      .htmlContent(OrderService.cancelOrderMessages[messageType].content)
      .ariaLabel('Canceling Order')
      .targetEvent(ev)
      .ok('Yes')
      .cancel('No');

    return this.$mdDialog.show(confirm)
      .then(_data => this.Request.post(`${config.API_URL}/api/${this.StatefulUserData.getRole( )}/orders/${orderId}/complete`))
      .then(response => response.data);
  }

  fillConfirmedList (invites) {
    invites
      .filter(invite => invite.status === ORDER_STATUSES.accepted)
      .forEach(invite => this.listConfirmed.push(invite));
  }
}

export default angular.module('OrderService', [
  Helper
]).service('OrderService', OrderService).name;
