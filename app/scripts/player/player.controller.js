(function () {
    'use strict';

    angular
        .module('app.player')
        .controller('PlayerController', PlayerController);

    PlayerController.$inject = ['$scope',
        '$interval',
        '$mdDialog',
        'radioChannel',
        'nowPlaying',
        'Icecast', 'Track'
    ];

    /* @ngInject */
    function PlayerController($scope,
                              $interval,
                              $mdDialog,
                              radioChannel,
                              nowPlaying,
                              Icecast,
                              Track) {

        var vm = this;
        vm.radioChannel = '';
        vm.radioChannelInd = 0;
        vm.nowPlayingFullTitle = '';

        vm.nowPlaying = nowPlaying;
        vm.voteDown = voteDown;

        switch (radioChannel) {
            case 'chl':
                vm.radioChannel = 'Chillout';
                vm.radioChannelInd = 0;
                break;
            case 'slf':
                vm.radioChannel = 'Soulful House';
                vm.radioChannelInd = 1;
                break;
            default:
                break;
        }

        vm.closePlayer = function () {
            $mdDialog.hide();
        };

        $interval(checkNowPlaying, 5000);

        //
        function voteDown() {

            console.log(vm.nowPlaying.votesDownCount);

            var track = {
                votesDownCount : vm.nowPlaying.votesDownCount + 1
            };
            Track.save().update({ _id: vm.nowPlaying._id }, track);

        }

        function checkNowPlaying() {

            Icecast.nowPlaying().then(function (data) {

                if (vm.nowPlayingFullTitle !== data.icestats.source[vm.radioChannelInd].title) {
                    vm.nowPlayingFullTitle = data.icestats.source[vm.radioChannelInd].title;
                    getTrackInfo(vm.nowPlayingFullTitle);
                }

            });

        }

        function getTrackInfo(fullTitle) {

            var fullTitleArr = fullTitle.split('__');

            Track.trackInfo(fullTitleArr[0], fullTitleArr[1], fullTitleArr[2]).then(function (info) {

                vm.nowPlaying = info[0];
                vm.nowPlaying.coverUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/' + info[0].cover;

            });

        }

    }

})();
