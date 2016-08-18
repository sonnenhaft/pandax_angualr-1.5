class mainController {

  constructor (User) {
    'ngInject';

    _.assign(this, {
      User,
      userAvatarSrc: ''
    });

    this.User.fetchUserAvatarSrc();
  }

}

export default mainController;
