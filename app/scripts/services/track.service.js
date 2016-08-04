(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('Track', Track);

    Track.$inject = ['$http', '$resource'];
    /* @ngInject */
    function Track($http, $resource) {

        return {
            save: save,
            trackInfo: trackInfo
        };

        function save() {
            
            return $resource('http://smoothtraxx-api.herokuapp.com/api/tracks/:_id/', {_id: '@_id'},
                {
                    update: {
                        method: 'PUT'
                    }
                });
        
        }

        function trackInfo(artist, title, album) {

            return $http({
                method: 'GET',
                url: 'http://smoothtraxx-api.herokuapp.com/api/tracks?conditions={"artist":"' + encodeURIComponent(artist) + '","title":"' + encodeURIComponent(title) + '","album":"' + encodeURIComponent(album) + '"}'
            })
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (rejection) {
                        return rejection.data;
                    }
                );

        }

    }

})();