(function () {
    'use strict';

    angular
        .module('run-config', [])
        .run(routeManager);

    routeManager.$injector = ['$state', '$rootScope'];

    /** @ngInject */
    function routeManager($state, $rootScope) {

        var changeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            moment.locale('pt-br');

            //VALIDAÇÕES DE AUTENTICAÇÃO

        });

        var changeSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {



        });

        var changeChangeError = $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            console.log(error);

        });

    }

})();
