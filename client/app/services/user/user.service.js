export default class User {

  constructor (Storage, $state) {
    'ngInject';

    _.assign(this, {Storage, $state, billingInfo: {}});

  }

  isAuth () {
    return this.Storage.getObject('MINX').user ? true : false;
  }

  get (param) {
    return param ?
      this.Storage.getObject('MINX').user[param] :
      this.Storage.getObject('MINX').user;
  }

  update (object) {
    console.log(_.assign(this.get(), object))
  }

  login (credentials) {
    this.preAuth(credentials);
    this.$state.go('profile');
  }

  register (credentials) {
    this.preAuth(credentials);
    this.$state.go('profile.create');
  }

  logout () {
    this.Storage.remove('MINX');
    this.$state.go('home');
  }

  preAuth (credentials) {
    this.Storage.setObject('MINX', {
      token: 'falseToken!ufhuishdfihsduf723e.rjueifgh8923yrhjo3nknhurfhg9823ornlkfn',
      user: {
        id: _.random(100000000),
        email: credentials.email,
        type: credentials.type,
        auth: credentials.auth
      }
    });
  }

  fetchBillingInfo () {
    /*
    ToDo: replace with real server request
     */
    return new Promise((resolve, reject) => {
          this.billingInfo = Object.assign(this.billingInfo, {
            first_name: 'Barry',
            last_name: 'Bom',
            mobile: '+123456789',
            cards: [{
              id: 1,
              name: 'Card 1',
              number: 1111222233334444,
              expiry: '19/21',
              cvc: 123
            }]
          });

        setTimeout(() => {
          resolve(this.billingInfo);
        }, 1000);
    })
  }

  saveBillingInfo () {
    /*
    ToDo: replace with real server request
     */
    return new Promise((resolve, reject) => {
          this.billingInfo = Object.assign(this.billingInfo, {
            first_name: 'Barry edit',
            last_name: 'Bom edit',
            mobile: '+123456789',
            cards: [{
              id: 1,
              name: 'Card 1',
              number: 1111222233334444,
              expiry: '19/21',
              cvc: 123
            }]
          });

        setTimeout(() => {
          resolve(this.billingInfo);
        }, 1000);
    })
  }

}
