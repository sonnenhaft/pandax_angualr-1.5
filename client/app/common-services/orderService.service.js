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

  constructor ($http, Helper, moment, WebSocket, $mdDialog, StatefulUserData, $q) {
    'ngInject';

    Object.assign(this, { $http, Helper, moment, WebSocket, $mdDialog, StatefulUserData, $q });
  }

  fetchEntertainers (orderId) {
    return this.$http.get(`{{config_api_url}}/api/orders/${orderId}/entertainers/search`).then(
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
    const url = `{{config_api_url}}/api/{{current_user_role}}/orders?page=${page}&status[]=accepted&status[]=in+progress&include=invites`;
    return this.$http.get(url).then(
      ({ data }) => {
        this.listFutures = data.items;
        return data;
      },
      error => console.log(error)
    );
  }

  _apiUrl (page) {
    return `{{config_api_url}}/api/{{current_user_role}}/orders/history?page=${page}&include=invites`;
  }

  fetchHistoryOrders (page = 1) {
    return this.$http.get(this._apiUrl(page)).then(result => {
      this.history = result.data.items;
      return result.data;
    });
  }

  getOrdersWithParam (orderId) {
    return this.fetchOrderDetails(orderId, 'invites').then(data => data);
  }

  /*   Invited entertainers   */
  fetchEntertainersInvited (orderId) {
    return this.$http.get(`{{config_api_url}}/api/customer/orders/${orderId}/invites`).then(
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
    return this.$http.get(`{{config_api_url}}/api/orders/${orderId}${include ? `?include=${include}` : ''}`).then(
      result => this.orderDetails = result.data,
      error => console.log(error)
    );
  }

  fetchProviderPastOrders (page = 1) {
    return this.$http.get(this._apiUrl(page)).then(result => {
      this.historyProvider = result.data.items;
      return result.data;
    });
  }

  inviteEntertainer (orderId, entertainerId) {
    return this.$http.post(`{{config_api_url}}/api/orders/${orderId}/entertainers/${entertainerId}/invite`).then(({ data }) => {
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
      .then(data => this.$http.put(`{{config_api_url}}/api/invite/${invite.id}/cancel`))
      .then(result => {
        invite.status = ORDER_STATUSES.canceledByCustomer;
        return result;
      });
  }


  /**
   * @deprecated useless comment
   * Confirmed entertainers
   */
  fetchEntertainersConfirmed (orderId) {
    return this.$http.get(`{{config_api_url}}/api/customer/orders/${orderId}/invites?status[]=accepted&status[]=canceled`).then(
      ({ data }) => {
        this.listConfirmed = data && data.items;
        return this.listConfirmed;
      },
      error => console.log(error)
    );
  }

  fetchLastNotAccomplishedOrder ( ) {
    return this.$http.get('{{config_api_url}}/api/customer/orders/last-not-accomplished');
  }

  payForOrder (orderId, cardId) {
    return this.$http.post(`{{config_api_url}}/api/{{current_user_role}}/orders/${orderId}/pay`, { card_id: cardId });
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
      .then(_data => this.$http.post(`{{config_api_url}}/api/{{current_user_role}}/orders/${orderId}/complete`))
      .then(response => response.data);
  }

  fillConfirmedList (invites) {
    invites
      .filter(invite => invite.status === ORDER_STATUSES.accepted)
      .forEach(invite => this.listConfirmed.push(invite));
  }

  setEntertainerCanceled (invite) {
    invite.status = 'canceled_by_customer';
  }

  fetchNotRatedEntertainers (data) {
    if (data) {
      return this.$q.when(data);
    } else {
      return this.$http.get('{{config_api_url}}/api/customer/unratedinvites').then(result => result.data);
    }
  }
}

export default angular.module('OrderService', [
  Helper
]).service('OrderService', OrderService).name;
