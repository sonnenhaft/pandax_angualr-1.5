import Helper from './helper.service';
import ORDER_STATUSES from '../common/ORDER_STATUSES';

class OrderService {
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
    return this.$http.get(this._apiUrl(page)).then(({ data }) => {
      this.history = data.items;
      return data;
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
    const coords = form.geo.coords;
    // TODO: fix place where lat and lng are not functions
    const lat = coords.lat ? coords.lat( ) : coords.latitude;
    const long = coords.lng ? coords.lng( ) : coords.longitude;
    return {
      service_type: Number(this.providers.find(({ active }) => active === true).type),
      length: parseFloat(form.hour).toString( ),
      location: form.geo.location.formatted_address,

      coordinates: {
        lat,
        long
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

  unsubscribeOnEntertainerInvite ( ) {
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
    return this.$mdDialog.show(
      this.$mdDialog.confirm( )
        .title('Cancel Minx')
        .textContent(penaltyAmount => penaltyAmount > 0 ? // eslint-disable-line no-confusing-arrow
          `Cancelling the order will cost $ ${penaltyAmount} penalty. Are you sure want to cancel order for the minx?` :
          'Are you sure want to cancel order for the minx?')
        .ariaLabel('Cancelling Entertainer')
        .targetEvent(ev)
        .ok('Yes')
        .cancel('No')
    )
      .then(( ) => {
        invite.$isLoading = true;
        return this.$http.put(`{{config_api_url}}/api/invite/${invite.id}/cancel`);
      })
      .then(result => {
        invite.status = ORDER_STATUSES.canceledByCustomer;
        return result;
      }).finally(( ) => invite.$isLoading = false);
  }

  fetchConfirmedEntertainers (orderId) {
    return this.$http.get(`{{config_api_url}}/api/customer/orders/${orderId}/invites?status[]=accepted&status[]=canceled`);
  }

  fetchLastNotAccomplishedOrder ( ) {
    return this.$http.get('{{config_api_url}}/api/customer/orders/last-not-accomplished');
  }

  payForOrder (orderId, card_id) {
    return this.$http.post(`{{config_api_url}}/api/{{current_user_role}}/orders/${orderId}/pay`, { card_id });
  }

  cancelOrder (orderId) {
    let title = 'Cancel order';
    let htmlContent = 'Are you sure want to cancel order?';

    if (this.listConfirmed.length > 0) {
      title = 'Cancel unconfirmed invites';
      htmlContent = `
        Are you sure want to cancel unconfirmed invites and complete this order?  <br/> 
        Note: We will do a refund of the money that you paid for  unconfirmed entertainers`;
    } else if (this.listInvited.length > 0) {
      title = 'Cancel unconfirmed invites';
      htmlContent = 'Are you sure want to cancel unconfirmed invites and cancel order?';
    }

    const URL = `{{config_api_url}}/api/{{current_user_role}}/orders/${orderId}/complete`;
    return this.$mdDialog.show(this.$mdDialog.confirm({
      title,
      htmlContent,
      ok: 'Yes',
      cancel: 'No',
      ariaLabel: 'Cancelling Order'
    }))
      .then(( ) => this.$http.post(URL))
      .then(({ data }) => data);
  }

  fillConfirmedList (invites) {
    invites
      .filter(({ status }) => status === ORDER_STATUSES.accepted)
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
