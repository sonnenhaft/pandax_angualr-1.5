const name = 'tipModal';
export default angular.module(name, []).component(name, {
  bindings: { modalSelector: '@' },
  transclude: true,
  template: '<span ng-transclude ng-click="$ctrl.showTip($event)"></span>',
  controller: function tipModalController ($mdDialog) {
    'ngInject';

    this.$onInit = function $onInit ( ) {
      const contentElement = this.modalSelector;
      this.$mdDialog = $mdDialog;
      this.showTip = targetEvent => $mdDialog.show({ contentElement, targetEvent });
    };
  }
}).name;
