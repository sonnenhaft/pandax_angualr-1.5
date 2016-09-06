export default class orderTermsController {

  constructor (Constants, User, Request, $state) {
    'ngInject';

    _.assign(this, {
      Constants,
      User,
      Request,
      $state
    });
console.log('this.order:', this.order);
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
            if (result.status == 200) {
              this.User.update(result.data.customer);
              this.$state.go('main.manipulationEntertainers', {orderId: result.data.id});
            }
          },
          error => {
            this.orderLoading = false;
            console.log(error);
          }
        );
    }
  }

}