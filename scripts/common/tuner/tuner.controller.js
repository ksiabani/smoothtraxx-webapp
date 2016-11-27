'use strict';

(function () {
    'use strict';

    angular.module('app.tuner').controller('TunerController', TunerController);

    TunerController.$inject = ['$scope', '$rootScope'];

    /* @ngInject */
    function TunerController($scope, $rootScope) {
        // For MDL to work
        // http://stackoverflow.com/questions/31278781/material-design-lite-integration-with-angularjs
        // $scope.$on('$viewContentLoaded', () => {
        //     $timeout(() => {
        //         componentHandler.upgradeAllRegistered();
        //     })
        // });

        // $rootScope.playerIsFull = false;


    }
})();
//# sourceMappingURL=tuner.controller.js.map
