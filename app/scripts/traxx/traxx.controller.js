(function () {
    'use strict';

    angular
        .module('app.traxx')
        .controller('TraxxController', TraxxController);

    TraxxController.$inject = ['$scope',
        '$timeout',
        '$log',
        '$interval',
        '$sce',
        '$document'
        // 'Icecast',
        // 'Track',
        // 'homeResolve'
    ];


    //TODO: is it safe to use document to choose DOM elements in comparison to angular.element

    /* @ngInject */
    function TraxxController($scope,
                            $timeout,
                            $log,
                            $interval,
                            $sce,
                            $document
                            // Icecast,
                            // Track,
                            // homeResolve
    ) {


        // For MDL to work
        // http://stackoverflow.com/questions/31278781/material-design-lite-integration-with-angularjs
        $scope.$on('$viewContentLoaded', () => {
            $timeout(() => {
                componentHandler.upgradeAllRegistered();
            })
        });

        var vm = this;


    }

})();
