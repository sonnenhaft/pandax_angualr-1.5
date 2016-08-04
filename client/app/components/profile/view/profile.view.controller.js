export default class ProfileViewController {

  constructor (Storage) {
    'ngInject';

    _.assign(this, {Storage});

    this.session = Storage.getObject('MINX');

  }

  $onInit () {
    if (this.session.user.photo && this.session.user.photo.$ngfBlobUrl) {
      this.photo = {
        background: 'url(' + this.session.user.photo.$ngfBlobUrl + ') no-repeat fixed center'
      };
    }
  }

}
