export default class Entertainers {


  constructor (Constants, Request) {
    'ngInject';

    _.assign(this, {
        Constants,
        Request,
        list: []
    });

  }

  fetchEntertainers(page = 1) {
    return this
      .Request
      .send(
        null,
        this.Constants.api.entertainers.get.method,
        this.Constants.api.entertainers.get.uri(page)
      )
      .then(
        result => {
          this.list = this.list.concat(result.data.items);
          return result.data;
        }
      );
  }

  getEntertainers() {
    return this.list;
  }

}
