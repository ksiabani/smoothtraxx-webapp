(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('miniplayer', miniplayer);

    /* @ngInject */
    function miniplayer () {
        var directive = {
            bindToController: true,
            controller: MiniplayerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'scripts/common/miniplayer/miniplayer.html'
        };

        /* @ngInject */
        function MiniplayerController() {
            var vm = this;
        }

        return directive;
    }
})();