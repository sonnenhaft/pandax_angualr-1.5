/** @deprecated using timeouts */
export default angular.module('activeMenuItemDirective', []).directive('activeMenuItem', ($state, $timeout, $rootScope) => {
  'ngInject';

  const cssClassNames = { active: 'active', opened: 'opened-subitems' };

  return {
    restrict: 'A',
    link: (scope, element) => {
      let menuItems = [];

      function clearAll ( ) {
        menuItems.removeClass(cssClassNames.opened);
      }

      function checkActiveSubItem ( ) {
        _.each(menuItems, menuItem => {
          if (menuItem.querySelector(`ul>li>a.${cssClassNames.active}`)) {
            angular.element(menuItem).addClass(cssClassNames.opened);
            angular.element(menuItem).children('a').addClass(cssClassNames.active);
          }
        });
      }

      function toggleOpened (menuItem) {
        if (!menuItem.hasClass(cssClassNames.opened)) {
          clearAll( );
        }
        angular.element(menuItem).toggleClass(cssClassNames.opened);
      }

      function init ( ) {
        menuItems = angular.element(element).children('li');

        checkActiveSubItem( );

        _.each(menuItems, menuItem => {
          angular.element(menuItem).children('a').bind('click', _e => {
            toggleOpened(angular.element(menuItem));
          });
        });

        $rootScope.$on('$stateChangeSuccess', (event, next, current) => {
          clearAll( );
          $timeout(checkActiveSubItem, 100);
        });
      }

      $timeout(init, 100);
    }
  };
}).name;
