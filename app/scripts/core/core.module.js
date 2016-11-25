(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngTouch',
            'ngResource',
            'ui.router',
            'angularScreenfull'
        ])
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state'];
    function appRun($rootScope, $state) {
        $rootScope.playerIsVisible = false; // player always hidden at startup
        $rootScope.sideNavIsVisible = false; // sideNav always hidden at startup
        $rootScope.navTitle = "";


        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.stateIsLoading = true;
        });


        $rootScope.$on('$stateChangeSuccess', function () {
            $rootScope.stateIsLoading = false;
        });

    }


    // .config(function($mdThemingProvider) {
    //   // $mdThemingProvider.theme('default').dark();
    //   // $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    //   // $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    // //   $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    // //   $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    // //     $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
    //     $mdThemingProvider.theme('default')
    //         .primaryPalette('grey',{'default': '900'})
    //         .accentPalette('grey',{'default': '700'})
    //         .backgroundPalette('grey',{'default': '900'})
    //         .dark();
    // })


})();
