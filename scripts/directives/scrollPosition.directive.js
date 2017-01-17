'use strict';

(function () {
    'use strict';

    angular.module('app.core').directive('scrollPosition', scrollPosition);

    /* @ngInject */
    function scrollPosition($window) {
        return {
            scope: {
                scroll: '=scrollPosition'
            },
            link: function link(scope, element, attrs) {
                var windowEl = angular.element($window);
                var handler = function handler() {
                    scope.scroll = windowEl.scrollTop();
                    console.log(windowEl.scrollTop());
                };
                windowEl.on('scroll', scope.$apply.bind(scope, handler));
                handler();
            }
        };
    }
})();

// var windowEl = angular.element($window);
// var handler = function() {
//     console.log(windowEl.scrollTop())
// };
// windowEl.on('scroll', handler);
//# sourceMappingURL=scrollPosition.directive.js.map
