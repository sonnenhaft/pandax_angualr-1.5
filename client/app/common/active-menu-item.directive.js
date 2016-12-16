import angular from 'angular';

export default angular.module('activeMenuItemDirective', [
]).directive('activeMenuItem', ['$state', '$timeout', '$rootScope', function ($state, $timeout, $rootScope) {
  'ngInject';

  const STYLES = {
    CSS_CLASS_LINK_ACTIVE: 'active',
    CSS_CLASS_OPENED_SUB_ITEMS: 'opened-subitems'
  };


  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      let menuItems = [];

      function toggleOpened(menuItem) {
        if (!menuItem.hasClass(STYLES.CSS_CLASS_OPENED_SUB_ITEMS)) {
          clearAll();
        }
        angular.element(menuItem).toggleClass(STYLES.CSS_CLASS_OPENED_SUB_ITEMS);
      }

      function clearAll() {
        menuItems.removeClass(STYLES.CSS_CLASS_OPENED_SUB_ITEMS);
      }

      function checkActiveSubItem() {
        _.each(menuItems, menuItem => {
          if (menuItem.querySelector('ul>li>a.' + STYLES.CSS_CLASS_LINK_ACTIVE)) {
            angular.element(menuItem).addClass(STYLES.CSS_CLASS_OPENED_SUB_ITEMS);
            angular.element(menuItem).children('a').addClass(STYLES.CSS_CLASS_LINK_ACTIVE);
          }
        });
      }

      function init() {
        menuItems = angular.element(element).children('li');

        checkActiveSubItem();

        _.each(menuItems, menuItem => {
          angular.element(menuItem).children('a').bind("click", (_e) => {
            toggleOpened(angular.element(menuItem));
          });
        });


        $rootScope.$on("$stateChangeSuccess", function (event, next, current) {
          clearAll();
          $timeout(checkActiveSubItem, 100);
        });
      }


      $timeout(init, 100);
    }
  }
}]).name;
