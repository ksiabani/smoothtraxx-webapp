(function () {
  'use strict';

  angular
    .module('app.radio')
    .controller('RadioController', RadioController);

  RadioController.$inject = ['$scope',
    '$timeout',
    '$mdSidenav',
    '$log',
    '$interval',
    '$sce',
    '$mdDialog',
    '$mdMedia',
    'Icecast',
    'Track',
    'homeResolve'
  ];

  /* @ngInject */
  function RadioController($scope,
                           $timeout,
                           $mdSidenav,
                           $log,
                           $interval,
                           $sce,
                           $mdDialog,
                           $mdMedia,
                           Icecast,
                           Track,
                           homeResolve) {

    var vm = this;

    vm.openMenu = openMenu;
    vm.showPlayer = showPlayer;
    vm.chlFullTitle = '';
    vm.slfFullTitle = '';
    vm.chl = homeResolve.chl;
    vm.slf = homeResolve.slf;


    vm.imgUrl = 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/';

    vm.covers = [
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/04d65851dc50e26395066064258e8ad9.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/03d1fc6f4eaaff2bda3e527d0c28eadc.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/031d68c527e3bd87e5cfe6695a5670a2.png',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/025ee32cf41eb6e7764f7fe33e06a704.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/076d3d1ea81f4ff4e1f8e52423204dcf.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/063d774295fffb2bce82238d848aa009.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/06124207eab441d3ccdcaa4b450064ee.jpg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/0532d42fdce8f06cc66429cce3b037e1.jpg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/051fc3d4c1bd33aca238c8d0df145bd1.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/05093cb9975d30c4f94ec1b9bf95a056.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/0726d3d8281d470051d50486134d1e60.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/03275d61bed5a555e62b5bde7dbc7e10.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/03307d3a3a64f5e90fd87d15aa2475d2.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/65a31de58a4013dd70f5e9fff9a7ab05.jpeg',
      'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/000a474600ff8f2f8dcec2002d015595.jpg'
    ];

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
      $mdSidenav('menu').toggle();
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
