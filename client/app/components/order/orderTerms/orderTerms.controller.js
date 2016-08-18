export default class orderTermsController {

  constructor (Constants, User, Request, $state) {
    'ngInject';

    _.assign(this, {
      Constants,
      User,
      Request,
      $state
    });

  }

  onAccept () {
    if (this.accepted) {
      this.orderLoading = true;
      this.Request
        .send(
          this.User.token(),
          this.Constants.api.order.method,
          this.Constants.api.order.uri,
          this.order
        )
        .then(
          result => {
            this.orderLoading = false;
            this.User.update(result.data.customer);
            this.$state.go('main.manipulationEntertainers');
          },
          error => {
            this.orderLoading = false;
            console.log(error);
          }
        );
    }
  }

}
