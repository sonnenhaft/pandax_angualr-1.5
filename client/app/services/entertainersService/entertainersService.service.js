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
        error => {
          return this.list = [{
            "id": 1,
            "name": "Nameeee",
            "displaying_name": "Displaying Name",
            "status": "Approved",
            "email": "email@mail.com",
            "phone": 34234234234,
            "raiting": 3.34,
            "city": "Cityyyyy",
            "photos": [{
              "preview": "https://material.angularjs.org/latest/img/icons/angular-logo.svg"
            }],
          },{
            "id": 2,
            "name": "Nameeee 2",
            "displaying_name": "Displaying Name 2",
            "status": "Approved 2",
            "email": "email2@mail.com",
            "phone": 22222222,
            "raiting": 2.24,
            "city": "Cityyyyy 2",
            "photos": [{
              "preview": "https://material.angularjs.org/latest/img/icons/angular-logo.svg"
            }],
          }]
          // return console.log(error)
        }
      );
  }

  getEntertainers() {
    return this.list;
  }

}
