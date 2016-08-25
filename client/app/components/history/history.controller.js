export default class historyController {

  constructor ($stateParams) {
    'ngInject';

    _.assign(this, {$stateParams});

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
