'use strict';

(function () {
    'use strict';

    angular.module('app.core').factory('Icecast', Icecast);

    Icecast.$inject = ['$http'];
    /* @ngInject */
    function Icecast($http) {

        return {
            nowPlaying: nowPlaying
        };

        function nowPlaying() {

            return $http({
                method: 'GET',
                url: 'http://broadcast.smoothtraxx.gr:8000/status-json.xsl'
            }).then(function (response) {
                return response.data;
            }, function (rejection) {
                return rejection.data;
            });
        }
    }
})();
//# sourceMappingURL=icecast.service.js.map
