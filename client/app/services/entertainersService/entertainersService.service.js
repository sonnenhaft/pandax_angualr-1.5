export default class Entertainers {


  constructor (Constants, Request) {
    'ngInject';

    _.assign(this, {
        Constants,
        Request,
        list: []
    });

  }

  fetchEntertainers() {
    return this
      .Request
      .send(
        null,
        this.Constants.api.entertainers.get.method,
        this.Constants.api.entertainers.get.uri()
      )
      .then(
        result => {
          return this.list = result.data;
        },
        error => console.log(error)
      );
  }

  getEntertainers() {
    return this.list;
  }

}
