export default class User {

  constructor (Storage, Constants, Request, $state, $http, Helper) {
    'ngInject';

    _.assign(this, {Storage, Constants, Request, $state, $http, Helper, userAvatarSrc: '', billingInfo: {}});
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
          return this.getUserProfile(result.data, this.get('role'));
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

          return this.login(credentials);
        },
        error => console.log(error)
      );
  }

  restore (email) {
    return this
      .Request
      .send(
        false,
        this.Constants.api.password.restore.method,
        this.Constants.api.password.restore.uri,
        email
      )
      .then(
        result => {
          if (result.data.detail) {
            return {
              error: result.data.detail
            };
          }

          return result;
        },
        error => console.log(error)
      );
  }

  reset (password, token) {
    return this
      .Request
      .send(
        false,
        this.Constants.api.password.change.method,
        this.Constants.api.password.change.uri(token),
        password
      )
      .then(
        result => {
          if (result.data.detail) {
            return {
              error: result.data.detail
            };
          }

          return result;
        },
        error => console.log(error)
      );
  }


  getUserProfile (user, type, redirectUser = true) {
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
          if (redirectUser == true) {
            this.redirectUser();
          }
          // return true;
          return result.data;
        },
        error => console.log(error)
      );
  }

  UpdateUserProfile (fields) {
    return this
      .Request
      .send(
        this.token(),
        this.Constants.api.profile.method.PUT,
        this.Constants.api.profile.uri(this.get('role')),
        fields
      )
      .then(
        result => result.data,
        error => console.log(error)
      );
  }

  UpdateUserPhoto (file, slot) {
    return this.Request
      .send(
        this.token(),
        this.Constants.api.photo.method,
        this.Constants.api.photo.uri(this.get('role'), slot),
        file
      )
      .then(
        result => {
          if (slot == 1) {
            this.setUserAvatarSrc(result.data)
          }
          return result.data;
        },
        error => console.log(error)
      )
  }

  redirectUser () {
    switch (true) {
      case this.get('role') === 'customer':
        this.$state.go('main.order');
        return false;

      case !this.get('first_name') || !this.get('last_name'):
        this.$state.go('main.profile.create');
        return false;

      default:
        this.$state.go('main.profile.view');
    }
  }

  logout () {
    this.Storage.remove('MINX');
    this.$state.go('home');
  }

  /*
    User avatar section
   */
  fetchUserAvatarSrc () {  
    return this.getUserProfile(_.assign(this.get(), {token: this.token()}), this.get('role'), false)
      .then(data => {
        return this.setUserAvatarSrc(data);
      });
  }

  setUserAvatarSrc (data = {}) {
    let photoSrc = '';

    if (data.photo) {
      photoSrc = data.photo.preview;
    } else if (data.photos && data.photos[0] && data.photos[0].preview) {
      photoSrc = data.photos[0].preview;
    }

    if (!photoSrc || photoSrc.length == 0) {
      photoSrc = this.Constants.user.avatar.empty;
    }

    return this.userAvatarSrc = photoSrc + '?' + this.Helper.getUniqueNumberByTime();
  }

  getUserAvatarSrc () {
    return this.userAvatarSrc;
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
