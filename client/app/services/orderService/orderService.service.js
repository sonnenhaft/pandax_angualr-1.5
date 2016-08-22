export default class Order {

  constructor () {
    // 'ngInject';

    _.assign(this, {
      list: [],
      providers: []
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

}
