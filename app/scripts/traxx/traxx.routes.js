(function () {
    'use strict';

    angular
        .module('app.traxx')
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('traxx', {
                    url: '/',
                    templateUrl: 'scripts/traxx/traxx.html',
                    controller: 'TraxxController',
                    controllerAs: 'vm'
                    // resolve: {
                    //     homeResolve: getTrackInfo
                    // }
                })
        });

    // getTrackInfo.$inject = ['$q', 'Icecast', 'Track'];

    /* @ngInject */
    function getTrackInfo($q, Icecast, Track) {

        return Icecast.nowPlaying().then(function (data) {

            var chlFullTitle,
                slfFullTitle,
                promises,
                trackInfo = {};

            // chlFullTitle = data.icestats.source[0].title.split('__');
            slfFullTitle = data.icestats.source[1].title.split('__');

            // promises = [getChlInfo(), getSlfInfo()];
            promises = [getSlfInfo()];

            return $q.all(promises).then(function () {
                return trackInfo;
            });

            // function getChlInfo() {
            //
            //     return Track.trackInfo(chlFullTitle[0], chlFullTitle[1], chlFullTitle[2]).then(function (info) {
            //         trackInfo.chl = info[0];
            //         trackInfo.chl.coverUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/' + info[0].cover;
            //     });
            //
            // }

            function getSlfInfo() {

                return Track.trackInfo(slfFullTitle[0], slfFullTitle[1], slfFullTitle[2]).then(function (info) {
                    trackInfo.slf = info[0];
                    if (info[0]) {
                        trackInfo.slf.coverUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/' + info[0].cover;
                    }
                });

            }

        });

    }

})();