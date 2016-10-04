export default class historyController {

  constructor ($stateParams, User) {
    'ngInject';

    _.assign(this, {$stateParams, User, role: User.get('role')});
  }

  $onInit () {
    if (this.$stateParams.type) {
      this.tab = this.switchActiveTab();
    }
  }

  switchActiveTab () {
    switch (this.$stateParams.type) {
      case 'past':
        return 1;

      case 'future':
        return 0;
    }
  }

}
