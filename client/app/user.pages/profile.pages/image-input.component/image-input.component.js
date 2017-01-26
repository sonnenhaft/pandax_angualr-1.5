import ngFileUpload from 'ng-file-upload';

export default angular.module('pandaImageInput', [
  ngFileUpload
]).component('pandaImageInput', {
  bindings: { name: '@', model: '=', onChange: '&', ngReadonly: '<', ngRequired: '<' },
  template: `
<button class="panda-image-input" aria-label="file" ngf-select ng-model="$ctrl.model" ng-disabled="$ctrl.ngReadonly"
        name="{{::$ctrl.name}}" ngf-capture="'camera'"
        ngf-max-size="10MB"
        ngf-max-height="7000"
        ngf-max-width="7000"
        ngf-min-height="200"
        ngf-min-width="200"
        ngf-pattern="'.png,.jpg,.jpeg'"
        ngf-accept="'.png,.jpg,.jpeg'"
        ng-required="$ctrl.ngRequired && !$ctrl.model">
  <!--ng-required="!$ctrl.model" is necessary in here because after minification app thinks that images does not exist-->
  <img ngf-src="$ctrl.model" alt="profile image" ng-show="$ctrl.model"/>
  <div class="hover-background"></div>
</button>`
}).component('pandaImageInputMessages', {
  require: { form: '^form' },
  bindings: { name: '@', header: '<' },
  template: `
 <div ng-messages="$ctrl.form[$ctrl.name].$error" class="validation-messages">
    <span ng-show="$ctrl.header && $ctrl.form[$ctrl.name].$invalid">{{::$ctrl.header}}</span>
    <span ng-message="maxHeight">Photo must be no less than 200 and no more than 7 000 pixels tall and wide</span>
    <span ng-message="maxWidth">Photo must be no less than 200 and no more than 7 000 pixels tall and wide</span>
    <span ng-message="minHeight">Photo must be no less than 200 and no more than 7 000 pixels tall and wide</span>
    <span ng-message="minWidth">Photo must be no less than 200 and no more than 7 000 pixels tall and wide</span>
    <span ng-message="maxSize">The file may not exceed 10 MB</span>
    <span ng-message="pattern">Invalid photo format</span>
    <span ng-message="required">Image is required</span>
  </div>`
}).name;
