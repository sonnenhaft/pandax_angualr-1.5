export default class Order {

  constructor (Helper, moment) {
    'ngInject';

    _.assign(this, {
      list: [],
      providers: [],
      Helper,
      moment
    });

  }

  fetchEntertainers() {
    /*
    ToDo: fetch from server
     */
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
    },{
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
    }]
  }

  getEntertainers() {
    return this.list;
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
