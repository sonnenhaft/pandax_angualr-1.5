export default class Order {

  constructor (User, Constants, Request) {
    'ngInject';

    _.assign(this, {
        User,
        Constants,
        Request,
        list: [],
        listConfirmed: [],
        entertainersInvitedCount: 0,
        entertainersConfirmedCount: 0
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
          this.entertainersInvitedCount = result.data.length;
          return result.data;
        },
        error => console.log(error)
      );
  }

  getEntertainers() {
    return this.list;
  }


  /* 
    Confirmed entertainers 
  */
  fetchEntertainersConfirmed() {
    /*
    ToDo: fetch from server
     */
    this.entertainersConfirmedCount = 2;
    return this.listConfirmed = [{
        id: 1,
        name: 'Elaize',
        photo: '/assets/images/photos/photo3.png'
    }/*,{
        id: 2,
        name: 'Sundra',
        photo: '/assets/images/photos/photo3.png'
    }*/]
  }

  getEntertainersConfirmed() {
    return this.listConfirmed;
  }

  /* 
    Invited entertainers count
  */
  fetchEntertainersInvitedCount() {
    /*
    ToDo: fetch from server
     */
    return this.entertainersInvitedCount = 1;
  }

  getEntertainersInvitedCount() {
    return this.entertainersInvitedCount;
  }

  /* 
    Confirmed entertainers count
  */
  fetchEntertainersConfirmedCount() {
    /*
    ToDo: fetch from server
     */
    return this.entertainersConfirmedCount = 2;
  }

  getEntertainersConfirmedCount() {
    return this.entertainersConfirmedCount;
  }
}
