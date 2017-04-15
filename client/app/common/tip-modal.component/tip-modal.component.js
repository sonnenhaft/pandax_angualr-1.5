const name = 'tipModal';
let id = 0;
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
}).component('simpleTipModal', {
  bindings: { label: '@' },
  transclude: true,
  controller: function tipModalController ($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    id += 1;
    this.id = `simpleTipModal${id}`;
  },
  template: `
<tip-modal modal-selector="#{{::$ctrl.id}}">
  {{::$ctrl.label}} <i class="desc-icon"></i>
  <div style="display: none">
    <div class="md-dialog-container desc entertainers-count-info" id="{{::$ctrl.id}}">
      <md-dialog>
        <span class="close" ng-click="$ctrl.$mdDialog.hide()"></span>
        <div layout-align="space-between center" layout-gt-sm="row" ng-transclude></div>
      </md-dialog>
    </div>
  </div>
</tip-modal>`
}).name;
