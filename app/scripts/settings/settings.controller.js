(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope',
        '$timeout',
        '$mdSidenav',
        '$log',
        '$interval',
        '$sce',
        '$mdDialog',
        '$mdMedia',
        'Icecast',
        'Track'
    ];

    /* @ngInject */
    function SettingsController($scope,
                                $timeout,
                                $mdSidenav,
                                $log,
                                $interval,
                                $sce,
                                $mdDialog,
                                $mdMedia,
                                Icecast,
                                Track) {

        var vm = this;


        vm.imgUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/';

        // vm.openMenu = openMenu;
        // vm.openSettings = openSettings;
        // vm.showPlayer = showPlayer;
        // vm.chlFullTitle = '';
        vm.slfFullTitle = '';
        // vm.chl = homeResolve.chl;
        // vm.slf = homeResolve.slf;

        vm.enabled = true;

        $interval(checkNowPlaying, 30000);

        //console.log(homeResolve);

        //
        function showPlayer($event, radioChannel) {

            var nowPlayingInfo;

            switch (radioChannel) {
                case 'chl':
                    nowPlayingInfo = vm.chl;
                    break;
                case 'slf':
                    nowPlayingInfo = vm.slf;
                    break;
                default:
                    break;
            }

            $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: '/scripts/player/player.tmpl.html',
                locals: {
                    radioChannel: radioChannel,
                    nowPlaying: nowPlayingInfo
                },
                controller: 'PlayerController as vm',
                fullscreen: true
            });

        }

        function openMenu() {
            $mdSidenav('sidenav').toggle();
        }

        function openSettings() {
            $mdSidenav('settingsnav').toggle();
        }

        function checkNowPlaying() {

            Icecast.nowPlaying().then(function (data) {

                if (vm.chlFullTitle !== data.icestats.source[0].title) {
                    vm.chlFullTitle = data.icestats.source[0].title;
                    getTrackInfo('chl', vm.chlFullTitle);
                }

                if (vm.slfFullTitle !== data.icestats.source[1].title) {
                    vm.slfFullTitle = data.icestats.source[1].title;
                    getTrackInfo('slf', vm.slfFullTitle);
                }

            });

        }

        function getTrackInfo(radioChannel, fullTitle) {

            var fullTitleArr = fullTitle.split('__');
            var coverUrl;

            Track.trackInfo(fullTitleArr[0], fullTitleArr[1], fullTitleArr[2]).then(function (info) {

                coverUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/' + info[0].cover;

                switch (radioChannel) {
                    case 'chl':
                        vm.chl = info[0];
                        vm.chl.coverUrl = coverUrl;
                        break;
                    case 'slf':
                        vm.slf = info[0];
                        vm.slf.coverUrl = coverUrl;
                        break;
                    default:
                        break;
                }

            });

        }

    }


})();
