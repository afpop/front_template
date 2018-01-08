(function () {
    'use strict';

    angular
        .module('route-config', [])
        .config(routerConfig);

    routerConfig.$injector = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                views: {

                }
            });

        $urlRouterProvider.otherwise('/');
    }
})();
