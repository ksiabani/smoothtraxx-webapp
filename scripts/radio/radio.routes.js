'use strict';

(function () {
    'use strict';

    angular.module('app.radio').config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('radio', {
            url: '/radio',
            abstract: true,
            template: '<ui-view/>'
        }).state('radio.onair', {
            url: '',
            templateUrl: 'scripts/radio/radio.html',
            controller: 'RadioController',
            controllerAs: 'vm'
        }).state('radio.upnext', {
            url: '/upnext',
            templateUrl: 'scripts/radio/upnext.html',
            controller: 'RadioUpNextController',
            controllerAs: 'vm'
        });
    });

    /*
     How abstract states and url work for UI-Router: If you give the 'radio.onair' state a url of '/radio/onair' you will
     get an error when trying to visit '/radio' directly. If you leave the url of the first child state empty though, a
     visit to the parents url will give this child state.
     See the conversation here:
     http://stackoverflow.com/questions/24969441/angularjs-ui-router-default-child-state-and-ui-sref
     */
})();
//# sourceMappingURL=radio.routes.js.map
