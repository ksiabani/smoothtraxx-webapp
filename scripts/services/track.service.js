'use strict';

(function () {
  'use strict';

  angular.module('app.core').factory('Track', Track);

  Track.$inject = ['$http', '$resource', '$timeout'];
  /* @ngInject */
  function Track($http, $resource, $timeout) {

    return {
      save: save,
      trackInfo: trackInfo
    };

    function save() {

      return $resource('http://smoothtraxx-api.herokuapp.com/api/tracks/:_id/', { _id: '@_id' }, {
        update: {
          method: 'PUT'
        }
      });
    }

    function trackInfo(artist, title, album) {

      // fake return promise to avoid continuously calling Heroku app
      // return $timeout( function() {
      //   return [{
      //     __v: 0,
      //       _id: '55f723672312f9d17b2d035b',
      //     album: 'Ain\'t That Funkin Kinda Hard On You',
      //     artist: 'Funkadelic',
      //     copied: true,
      //     cover: '127cab8db80a945e05f1cc21a9e8c26f.jpeg',
      //     coverUrl: 'https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/127cab8db80a945e05f1cc21a9e8c26f.jpeg',
      //     created: '2015-09-14T19:43:38.313Z',
      //     favorites: Array[0],
      //     favoritesCount: 0,
      //     filename_128: 'a3dadba4a28d6ab0ed64f48c15881c10.mp3',
      //     genre: 'Soulful House',
      //     publisher: 'Vega Records',
      //     released: '2015-07-09T00:00:00.000Z',
      //     source: '/volume1/RaiNAS/music/offline/2015/07-2015/10/Funkadelic - Ain\'t That Funkin Kinda Hard On You-(VR 156)/Funkadelic - Ain\'t That Funkin Kinda Hard On You-(VR 156)/01-Funkadelic-Ain\'t That Funkin\' Kinda Hard On You (Louie Vega Dance Ritual Mix)-Essentialhouse.net.mp3',
      //     title: 'Ain\'t That Funkin\' Kinda Hard On You (Louie Vega Dance Ritual Mix)',
      //     votesDown: Array[0],
      //     votesDownCount: 0,
      //     votesUp: Array[0],
      //     votesUpCount: 0,
      //     year: '2015'
      //   }];
      // },0);

      return $http({
        method: 'GET',
        url: 'http://smoothtraxx-api.herokuapp.com/api/tracks?conditions={"artist":"' + encodeURIComponent(artist) + '","title":"' + encodeURIComponent(title) + '","album":"' + encodeURIComponent(album) + '"}'
      }).then(function (response) {
        console.log(response.data);
        return response.data;
      }, function (rejection) {
        return rejection.data;
      });
    }
  }
})();
//# sourceMappingURL=track.service.js.map
