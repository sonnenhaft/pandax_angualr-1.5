export default class User {

  constructor (Storage, Constants, Request, $state, $http) {
    'ngInject';

    _.assign(this, {Storage, Constants, Request, $state, $http});

  }

  isAuth () {
    return this.Storage.getObject('MINX').user ? true : false;
  }

  token () {
    if (this.isAuth()) {
      return this.Storage.getObject('MINX').token;
    }
  }

  get (param) {
    return param ?
      this.Storage.getObject('MINX').user[param] :
      this.Storage.getObject('MINX').user;
  }

  update (object) {
    let session = this.Storage.getObject('MINX');

    this.Storage.setObject('MINX', _.assign(
      session, {
        user: _.assign(session.user, object)
      }
    ));
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
  }

  login (credentials) {
    return this
      .Request
      .send(
        false,
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
          this.getUserProfile(result.data, credentials.type);
        },
        error => console.log(error)
      );
  }

  register (credentials) {
    return this
      .Request
      .send(
        false,
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

  getUserProfile (user, type) {
    return this
      .Request
      .send(
        user.token,
        this.Constants.api.profile.method.GET,
        this.Constants.api.profile.uri(type)
      )
      .then(
        result => {
          this.update(result.data);
          this.redirectUser();
        },
        error => console.log(error)
      );
  }

  UpdateUserProfile (fields) {
    return this
      .Request
      .send(
        this.token(),
        this.Constants.api.profile.method.PATCH,
        this.Constants.api.profile.uri(this.get('role')),
        fields
      )
      .then(
        result => {
          console.log(result);
        },
        error => console.log(error)
      );
  }

  redirectUser () {
    switch (true) {
      case this.get('role') === 'customer':
        this.$state.go('main.order');
        return false;

      case this.get('first_name') && this.get('last_name'):
        this.$state.go('profile.view');
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
