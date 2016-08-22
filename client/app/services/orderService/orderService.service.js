export default class Order {

  constructor () {
    // 'ngInject';

    _.assign(this, {
        list: [],
        listConfirmed: [],
        providers: [],
        entertainersInvitedCount: 0,
        entertainersConfirmedCount: 0
    });

  }

  fetchEntertainers() {
    /*
    ToDo: fetch from server
     */
    this.entertainersInvitedCount = 3;
    return this.list = [{
        id: 1,
        name: 'Karla',
        descr: 'Description',
        distance: 3,
        raiting: 8.2,
        photo_small: [
            '/assets/images/photos/photo2.png',
            '/assets/images/photos/photo2.png',
            '/assets/images/photos/photo3.png'
        ]
    }/*,{
        id: 2,
        name: 'Marla',
        descr: 'Description 2',
        distance: 2,
        rate: 4.2,
        photo_small: [
            '/assets/images/photos/photo3.png',
            '/assets/images/photos/photo3.png',
            '/assets/images/photos/photo2.png'
        ]
    },{
        id: 3,
        name: 'Sandra',
        descr: 'Description 3',
        distance: 3,
        rate: 2.2,
        photo_small: [
            '/assets/images/photos/photo3.png',
            '/assets/images/photos/photo2.png',
            '/assets/images/photos/photo2.png'
        ]
    }*/]
  }

  getEntertainers() {
    return this.list;
  }

  getProviders() {
    return this.providers;
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
