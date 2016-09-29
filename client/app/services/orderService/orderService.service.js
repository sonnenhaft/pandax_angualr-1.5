export default class Order {


  constructor (User, Constants, Request, Helper, moment, WebSocket, $mdDialog) {
    'ngInject';

    _.assign(this, {
        User,
        Constants,
        Request,
        WebSocket,
        list: [],
        listInvited: [],
        providers: [],
        history: [],
        historyProvider: {},
        Helper,
        moment,
        orderDetails: {},
        $mdDialog,
        listFutures: []
    });

  }

  fetchEntertainers(orderId) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.searchEntertainers.method,
        this.Constants.api.searchEntertainers.uri(orderId)
      )
      .then(
        result => {
          return this.list = result.data;
        },
        error => console.log(error)
      );
  }

  getEntertainers() {
    return this.list;
  }

  getProviders() {
    return this.providers;
  }

  fetchFuturesOrders(page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.orderFutures.method,
        this.Constants.api.orderFutures.uri(this.User.get('role'), page)
      )
      .then(
        result => {
          this.listFutures = result.data.items;
          return result.data;
        },
        error => console.log(error)
      );
  }

  fetchHistoryOrders(page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.orderHistory.method,
        this.Constants.api.orderHistory.uri(this.User.get('role'), page)
      )
      .then(
        result => {
          this.history = result.data.items;
          return result.data;
        }
      );
  }

  getOrdersWithParam(orderId) {
    return this.fetchOrderDetails(orderId, 'invites')
            .then(data => data);    
  }

  /*
    Invited entertainers
  */
  fetchEntertainersInvited(orderId) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.invitedEntertainers.method,
        this.Constants.api.invitedEntertainers.uri(orderId)
      )
      .then(
        result => {
          this.listInvited = result.data && result.data.items;
          return this.sortList();
        },
        error => console.log(error)
      );
  }


  buildOrder (form) {
    return {
      service_type: Number(_.head(this.Helper.getActiveObjectFromArray(this.getProviders())).type),
      length: parseFloat(form.hour).toString(),
      location: form.geo.location.formatted_address,
      coordinates: {
        lat: form.geo.coords.latitude.toString(),
        long: form.geo.coords.longitude.toString()
      },
      location_notes: form.notes ? form.notes : '',
      apartment: form.apt,
      asap: form.asap,
      datetime: form.asap ?
        this.moment() :
        this.moment(new Date(this.moment(form.date).format('YYYY/MM/DD') + ' ' + form.time)),
      entertainers_number: Number(form.entertainer),
      guests_number: form.guest.toString(),
      cost: form.price.toString()
    }
  }


  fetchOrderDetails(orderId, include = '') {
    return this
      .Request
      .send(
        null,
        this.Constants.api.orderDetails.method,
        this.Constants.api.orderDetails.uri(orderId, include)
      )
      .then(
        result => {
          return this.orderDetails = result.data;
        },
        error => console.log(error)
      );
  }


  fetchProviderPastOrders (page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.orderHistory.method,
        this.Constants.api.orderHistory.uri(this.User.get('role'), page)
      )
      .then(
        result => {
          this.historyProvider = result.data.items;
          return result.data;
        },
        error => console.log(error)
      );
  }


  inviteEntertainer (orderId, entertainer) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.inviteEntertainer.method,
        this.Constants.api.inviteEntertainer.uri(orderId, entertainer.id)
      )
      .then(
        result => {
          this.addEntertainerToInvitedList({id: result.data.invite_id, provider: entertainer});
          return result.data;
        }
      );
  }

  getChannelNameOfOrder (orderId) {
    return this.fetchOrderDetails(orderId)
      .then(
        orderDetails => {
          return orderDetails.channel_name;
        },
        error => console.log(error)
      )
  }

  addEntertainerToInvitedList (entertainer) {
    this.listInvited.push(entertainer);
    return this.listInvited;
  }

  subcribeOnEntertainerInvite (channelName) {
    this.WebSocket.invites(channelName, this.setEntertainerConfirmed.bind(this));
  }

  unsubcribeOnEntertainerInvite () {
    this.WebSocket.close();
  }

  setEntertainerConfirmed (data) {
    let entertainer = _.find(this.listInvited, (item) => item.provider.id == data.provider_id);
    entertainer.status = this.Constants.order.statuses.accepted;
    entertainer.datetime = data.datetime;
    this.sortList();
  }

  sortList (list = this.listInvited) {
    list.sort((itemA, itemB) => {
        return this.moment(itemA.datetime) - this.moment(itemB.datetime);
    });
  }

  cancelOrderForEntertainer (ev, invite, cost) {
    let confirm = this.$mdDialog.confirm()
          .title('Cancel Minx')
          .textContent(this.Constants.order.cancelEntertainerMessage(cost))
          .ariaLabel('Canceling Entertainer')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

    return this.$mdDialog.show(confirm).then((data) => {
      return this
        .Request
        .send(
          null,
          this.Constants.api.cancelEntertainerByCustomer.method,
          this.Constants.api.cancelEntertainerByCustomer.uri(invite.id)
        )
        .then(
          result => {
            this.setEntertainerCanceled(invite);
            return result;
          }
        );
      return data;
    });
  }

  setEntertainerCanceled (invite) {
    invite.status = this.Constants.order.statuses.canceled;
  }

  /*
    Confirmed entertainers
  */
  fetchEntertainersConfirmed(orderId) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.confirmedEntertainers.method,
        this.Constants.api.confirmedEntertainers.uri(orderId)
      )
      .then(
        result => {
          this.listConfirmed = result.data && result.data.items;
          return this.listConfirmed;
        },
        error => console.log(error)
      );
  }

  fetchLastNotAccomplishedOrder () {
    return this
      .Request
      .send(
        null,
        this.Constants.api.lastNotAccomplishedOrder.method,
        this.Constants.api.lastNotAccomplishedOrder.uri()
      )
      .then(
        result => {
          return result.data;
        }
      );
  }

}
