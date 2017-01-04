export default angular.module('spinner', []).component('spinner', {
  bindings: { input: '<' },
  transclude: true,
  template: `
<span ng-hide="$ctrl.input" ng-transclude></span>
<div id="spinner" ng-if="$ctrl.input">
  <div layout="row" layout-sm="column" layout-align="space-around" style="display: flex;align-items: center;">
    <md-progress-circular md-mode="indeterminate" md-diameter="30"></md-progress-circular>
  </div>
</div>
`
}).name;
