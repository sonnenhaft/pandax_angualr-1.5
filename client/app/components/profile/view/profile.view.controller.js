export default class ProfileViewController {

  constructor ($state, $stateParams) {
    'ngInject';

    _.assign(this, {$stateParams});

    this.mode = $state.current.name;

  }

  $onInit () {
    if (this.$stateParams.mode) {
      this.mode = this.$stateParams.mode;
    }
  }

}
