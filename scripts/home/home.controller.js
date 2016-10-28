'use strict';

(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$timeout',
    // '$mdSidenav',
    '$log', '$interval', '$sce', '$document',
    // '$mdDialog',
    // '$mdMedia',
    'Icecast', 'Track', 'homeResolve'];

    //TODO: is it safe to use document to choose DOM elements in comparison to angular.element

    /* @ngInject */
    function HomeController($scope, $timeout,
    // $mdSidenav,
    $log, $interval, $sce, $document,
    // $mdDialog,
    // $mdMedia,
    Icecast, Track, homeResolve) {

        // For MDL to work
        // http://stackoverflow.com/questions/31278781/material-design-lite-integration-with-angularjs
        $scope.$on('$viewContentLoaded', function () {
            $timeout(function () {
                componentHandler.upgradeAllRegistered();
            });
        });

        var vm = this;
        var snackbarContainer = document.querySelector('#snackbar');
        var handler = function handler(event) {
            // showSnackbarButton.style.backgroundColor = '';
            vm.voteDownDisabled = false;
        };

        vm.imgUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/';

        vm.openMenu = openMenu;
        vm.openSettings = openSettings;
        vm.showPlayer = showPlayer;
        vm.chlFullTitle = '';
        vm.slfFullTitle = '';
        // vm.chl = homeResolve.chl;
        vm.slf = homeResolve.slf;
        vm.isBuffering = true;
        vm.isPlaying = false;
        vm.play = vm.play;
        vm.pause = vm.pause;
        vm.showStyles = false;
        vm.toggleStyles = toggleStyles;

        vm.showSnackbar = showSnackbar;
        vm.voteDownDisabled = false;
        vm.rightDrawerIsVisible = false;

        // vm.fullScreen = fullScreen;


        $interval(checkNowPlaying, 3000);

        //console.log(homeResolve);
        // vm.audio = angular.element(document.getElementsByTagName('audio')[0]);
        vm.audio = document.getElementsByTagName('audio')[0];

        // vm.audio.addEventListener('canplay', function() {
        //     vm.isBuffering = false;
        //     vm.isPlaying = true;
        // }, false);


        vm.play = function () {
            vm.audio.play();
            vm.isPlaying = true;
        };

        vm.pause = function () {
            vm.audio.pause();
            vm.isPlaying = false;
        };

        function showSnackbar() {

            if (vm.voteDownDisabled) return;

            var data = {
                message: 'Track was voted down',
                timeout: 2000,
                actionHandler: handler,
                actionText: 'Undo'
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
            vm.voteDownDisabled = true;
        }

        function showPlayer($event, radioChannel) {

            var nowPlayingInfo;

            switch (radioChannel) {
                // case 'chl':
                //     nowPlayingInfo = vm.chl;
                //     break;
                case 'slf':
                    nowPlayingInfo = vm.slf;
                    break;
                default:
                    break;
            }

            // $mdDialog.show({
            //     parent: angular.element(document.body),
            //     targetEvent: $event,
            //     templateUrl: '/scripts/player/player.tmpl.html',
            //     locals: {
            //         radioChannel: radioChannel,
            //         nowPlaying: nowPlayingInfo
            //     },
            //     controller: 'PlayerController as vm',
            //     fullscreen: true
            // });
        }

        function openMenu() {
            $mdSidenav('sidenav').toggle();
        }

        function openSettings() {
            $mdSidenav('settingsnav').toggle();
        }

        function toggleStyles() {
            vm.showStyles = !vm.showStyles;
        }

        function checkNowPlaying() {

            Icecast.nowPlaying().then(function (data) {

                // if (vm.chlFullTitle !== data.icestats.source[0].title) {
                //     vm.chlFullTitle = data.icestats.source[0].title;
                //     getTrackInfo('chl', vm.chlFullTitle);
                // }

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

                if (info[0]) {
                    coverUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/' + info[0].cover;
                }

                switch (radioChannel) {
                    // case 'chl':
                    //     vm.chl = info[0];
                    //     vm.chl.coverUrl = coverUrl;
                    //     break;
                    case 'slf':
                        vm.slf = info[0];
                        if (info[0]) {
                            vm.slf.coverUrl = coverUrl;
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    }
})();
//# sourceMappingURL=home.controller.js.map
