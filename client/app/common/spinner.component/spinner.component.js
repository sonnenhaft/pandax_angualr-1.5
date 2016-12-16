import angular from 'angular';
import uiRouter from 'angular-ui-router';

class controller {
  $onChanges (changes) {
    this.display = changes.input.currentValue;
  }
}

export default angular.module('spinner', [
  uiRouter
]).component('spinner', {
  bindings: {
    input: '<',
    output: '&'
  },
  template: `
<div id="spinner" ng-if="$ctrl.display">
  <div layout="row" layout-sm="column" layout-align="space-around">
    <md-progress-circular md-mode="indeterminate" md-diameter="30"></md-progress-circular>
  </div>
</div>
`,
  controller
}).name;
