(function () {
    'use strict';

    angular
        .module('app.radio')
        .controller('RadioController', RadioController);

    RadioController.$inject = ['$scope',
        '$rootScope',
        '$timeout',
        // '$mdSidenav',
        '$log',
        '$interval',
        '$sce',
        '$document',
        // '$mdDialog',
        // '$mdMedia',
        'Icecast',
        'Track'
    ];


    //TODO: is it safe to use document to choose DOM elements in comparison to angular.element

    /* @ngInject */
    function RadioController($scope,
                            $rootScope,
                            $timeout,
                            // $mdSidenav,
                            $log,
                            $interval,
                            $sce,
                            $document,
                            // $mdDialog,
                            // $mdMedia,
                            Icecast,
                            Track
    ) {


        // For MDL to work
        // http://stackoverflow.com/questions/31278781/material-design-lite-integration-with-angularjs
        $scope.$on('$viewContentLoaded', () => {
            $timeout(() => {
                componentHandler.upgradeAllRegistered();
            })
        });
        $rootScope.navTitle = 'radio';
        var vm = this;

        //TODO: Must rename these two to sth most appropriate
        var snackbarContainer = document.querySelector('#snackbar');
        var handler = function(event) {
            // showSnackbarButton.style.backgroundColor = '';
            vm.voteDownDisabled = false;
        };



        vm.imgUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/';

        vm.openMenu = openMenu;
        vm.openSettings = openSettings;
        // vm.showPlayer = showPlayer;
        vm.chlFullTitle = '';
        vm.slfFullTitle = '';
        // vm.chl = homeResolve.chl;
        // vm.slf = homeResolve.slf;
        vm.isBuffering = true;
        vm.isPlaying = false;
        vm.play = vm.play;
        vm.pause = vm.pause;
        vm.showStyles = false;
        vm.toggleStyles = toggleStyles;

        vm.showSnackbar = showSnackbar;
        vm.voteDownDisabled = false;
        vm.genresDrawerIsVisible = false;
        vm.hideSidenav = hideSidenav;
        vm.showPlayer = showPlayer;
        $rootScope.playerIsFull = false; //player never full at startup


        vm.covers= [
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/b488229f3931d8843405bfc1998359bd.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/b20af0e974b8ad98d04db3e655f39a25.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/7c86b420bcbd1ba579024c13c086d13c.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/fc33041ca442d2efddd992406401b1e8.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/d07f79afbdf459970d7663ceb189f004.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/c4be736a8aacd2f237445bc7eec32730.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/a17cc0cb2a60ae8eb2dfd13e4b60542c.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/693e9af84d3dfcc71e640e005bdc5e2e.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/36bb368aafe7b2e40c90d16c056a722e.jpeg',
            'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/532089d6b7aff7b98b80eba86ff35dee.jpeg'
        ];





        $interval(checkNowPlaying, 3000);

        //console.log(homeResolve);
        // vm.audio = angular.element(document.getElementsByTagName('audio')[0]);
        vm.audio = document.getElementsByTagName('audio')[0];

        // vm.audio.addEventListener('canplay', function() {
        //     vm.isBuffering = false;
        //     vm.isPlaying = true;
        // }, false);


        vm.play = function() {
            vm.audio.play();
            vm.isPlaying = true;
        };

        vm.pause = function() {
            vm.audio.pause();
            vm.isPlaying = false;
        };

        function showPlayer() {
            $rootScope.playerIsVisible = true;
        }



        function hideSidenav() {
            angular
                .element( document.querySelector('.smx-sidenav') )
                .removeClass('is-visible');
            angular
                .element( document.querySelector('.mdl-layout__obfuscator') )
                .removeClass('is-visible');

        }

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


        // function showPlayer($event, radioChannel) {
        //
        //     var nowPlayingInfo;
        //
        //     switch (radioChannel) {
        //         // case 'chl':
        //         //     nowPlayingInfo = vm.chl;
        //         //     break;
        //         case 'slf':
        //             nowPlayingInfo = vm.slf;
        //             break;
        //         default:
        //             break;
        //     }
        //
        //     // $mdDialog.show({
        //     //     parent: angular.element(document.body),
        //     //     targetEvent: $event,
        //     //     templateUrl: '/scripts/player/player.tmpl.html',
        //     //     locals: {
        //     //         radioChannel: radioChannel,
        //     //         nowPlaying: nowPlayingInfo
        //     //     },
        //     //     controller: 'PlayerController as vm',
        //     //     fullscreen: true
        //     // });
        //
        // }

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
