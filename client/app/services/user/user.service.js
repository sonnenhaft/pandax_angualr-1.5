export default class User {

  constructor (Storage, Constants, Request, $state, $http) {
    'ngInject';

    _.assign(this, {Storage, Constants, Request, $state, $http});

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
    return this
      .Request
      .send(
        this.Constants.api.login.method,
        this.Constants.api.login.uri,
        {
          email: credentials.email,
          password: credentials.password
        }
      )
      .then(
        result => {
          if (result.data.message) {
            return {
              error: result.data.message
            };
          }

          this.create(result.data);
        },
        error => console.log(error)
      );
  }

  register (credentials) {
    return this
      .Request
      .send(
        this.Constants.api.signup.method,
        this.Constants.api.signup.uri(credentials.type),
        {
          email: credentials.email,
          password: credentials.password
        }
      )
      .then(
        result => {
          if (result.data.detail) {
            return {
              error: result.data.detail
            };
          }

          this.login(credentials);
        },
        error => console.log(error)
      );
  }

  create (user) {
    user.data.role = user.data.role === 'client' ?
      'customer' :
      user.data.role;

    this.Storage.setObject('MINX', {
      token: user.token,
      user: _.assign(user.data, {
        auth: user.data.first_name && user.data.last_name
      })
    });

    switch (true) {
      case user.data.role === 'customer':
        this.$state.go('main.order');
        return false;

      case user.data.first_name && user.data.last_name:
        this.$state.go('main.order');
        return false;

      default:
        this.$state.go('profile.create');
    }
  }

  logout () {
    this.Storage.remove('MINX');
    this.$state.go('home');
  }

}
