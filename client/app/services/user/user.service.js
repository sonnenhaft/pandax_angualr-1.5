export default class User {

  constructor (Storage, $state) {
    'ngInject';

    _.assign(this, {Storage, $state});

    this.session = this.Storage.getObject('MINX');

  }

  isAuth () {
    return this.session.user;
  }

  login (credentials) {
    this.preAuth(credentials);
    this.$state.go('profile');
  }

  register (credentials) {
    this.preAuth(credentials);
    this.$state.go('profile');
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

}
