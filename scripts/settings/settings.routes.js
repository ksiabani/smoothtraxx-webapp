'use strict';

(function () {
    'use strict';

    angular.module('app.settings').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('settings', {
            url: '/settings',
            templateUrl: '/scripts/settings/settings.html',
            controller: 'SettingsController',
            controllerAs: 'vm'
        });
    });
})();
//# sourceMappingURL=settings.routes.js.map
