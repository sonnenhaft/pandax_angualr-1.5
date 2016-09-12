export default class CancelOrderForEntertainer {

  constructor (Constants, $mdDialog) {
    'ngInject';

    _.assign(this, {Constants, $mdDialog});
  }

  showConfirm (penaltyAmount, onConfirmed, onDeclined) {

    let confirm = $mdDialog.confirm()
          .title('Cancel Minx')
          .textContent(this.Constants.order.cancelEntertainerMessage(penaltyAmount))
          .ariaLabel('Canceling Entertainer')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      if (angular.isFunction(onConfirmed)) {
        this.onConfirmed();
      }
    }, () => {
       if (angular.isFunction(onDeclined)) {
        this.onDeclined();
      }
    });
  };

}

