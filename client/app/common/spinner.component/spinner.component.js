export default angular.module('spinner', []).component('spinner', {
  bindings: { input: '<' },
  transclude: true,
  template: `
<span ng-hide="$ctrl.input" ng-transclude></span>
<div class="loading-spinner" ng-if="$ctrl.input">
  <div layout="row" layout-sm="column" layout-align="space-around" class="spinner-inner">
    <md-progress-circular md-mode="indeterminate" md-diameter="30"></md-progress-circular>
  </div>
</div>
`
}).name;
