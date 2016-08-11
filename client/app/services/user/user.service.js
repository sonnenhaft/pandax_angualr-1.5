export default class User {

  constructor (Storage, $state) {
    'ngInject';

    _.assign(this, {Storage, $state});

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

}
