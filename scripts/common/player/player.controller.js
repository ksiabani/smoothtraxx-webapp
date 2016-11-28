'use strict';

(function () {
    'use strict';

    angular.module('app.player').controller('PlayerController', PlayerController);

    PlayerController.$inject = ['$scope', '$rootScope'];

    /* @ngInject */
    function PlayerController($scope, $rootScope) {
        // For MDL to work
        // http://stackoverflow.com/questions/31278781/material-design-lite-integration-with-angularjs
        $scope.$on('$viewContentLoaded', function () {
            $timeout(function () {
                componentHandler.upgradeAllRegistered();
            });
        });

        $rootScope.playerIsFull = false;

        var vm = this;
        vm.showFullPlayer = showFullPlayer;
        vm.hideFullPlayer = hideFullPlayer;
        vm.showPool = showPool;

        vm.covers = ['https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/b488229f3931d8843405bfc1998359bd.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/b20af0e974b8ad98d04db3e655f39a25.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/7c86b420bcbd1ba579024c13c086d13c.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/fc33041ca442d2efddd992406401b1e8.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/d07f79afbdf459970d7663ceb189f004.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/c4be736a8aacd2f237445bc7eec32730.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/a17cc0cb2a60ae8eb2dfd13e4b60542c.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/693e9af84d3dfcc71e640e005bdc5e2e.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/36bb368aafe7b2e40c90d16c056a722e.jpeg', 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/532089d6b7aff7b98b80eba86ff35dee.jpeg'];

        vm.track = {
            title: "hello"
        };

        //
        function showFullPlayer() {
            $rootScope.playerIsFull = true;
        }

        function hideFullPlayer() {
            $rootScope.playerIsFull = false;
        }

        function showPool() {
            $rootScope.poolIsVisible = true;
        }
    }
})();
//# sourceMappingURL=player.controller.js.map
