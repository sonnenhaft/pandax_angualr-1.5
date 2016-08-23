export default class Order {

  constructor (Helper, moment) {
    'ngInject';

    _.assign(this, {
        list: [],
        listConfirmed: [],
        entertainersInvitedCount: 0,
        entertainersConfirmedCount: 0,
        providers: [],
        Helper,
        moment
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

  getProviders() {
    return this.providers;
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
}
