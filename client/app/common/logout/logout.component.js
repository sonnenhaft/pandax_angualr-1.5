import controller from './logout.controller';

let logoutComponent = {
  restrict: 'E',
  bindings: {},
  template: `
    <div class="logout">
      <span ng-click="$ctrl.showWarning($event)" class="name">Log out</span>
      <div style="visibility: hidden">
        <div class="md-dialog-container" id="logout-window">
          <md-dialog aria-label="logout" class="logout-modal">
            <span class="close" ng-click="$ctrl.$mdDialog.hide()"></span>
            <div class="text">
              Are you sure you want to log out?
            </div>
            <div class="buttons">
              <md-button class="cancel" ng-click="$ctrl.$mdDialog.hide()">Cancel</md-button>
              <md-button class="yes" ng-click="$ctrl.logout()">Yes</md-button>
            </div>
          </md-dialog>          
        </div>    
      </div>
    </div>
  `,
  controller
};

export default logoutComponent;
