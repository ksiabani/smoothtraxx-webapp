(function () {
    'use strict';

    angular
        .module('app.radio')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('radio', {
                    url: '/radio',
                    templateUrl: 'scripts/radio/radio.html',
                    controller: 'RadioController',
                    controllerAs: 'vm'
                })
        });

})();