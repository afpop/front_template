(function () {
    'use strict';

    angular
        .module('interceptor-provider.service', [])
        .service('interceptorProviderService', interceptorProviderService);

    interceptorProviderService.$injector = ['$q', '$rootScope'];

    /** @ngInject */
    function interceptorProviderService($q, $rootScope) {

        var interceptorService = {};

        interceptorService.request = _request;
        interceptorService.responseError = _responseError;

        return interceptorService;

        function _request(config) {

            config.headers = config.headers || {};

            //if (autenticacaoService.estaLogado())
              //  config.headers.Authorization = 'Bearer ' + localStorageService.get('authData').token;

            return config;
        }

        function _responseError(rejection) {

            if (rejection.status === 401) {

               // localStorageService.set("rotaDefinida", $rootScope.stateName);
                //autenticacaoService.logout();

                var stateService = $injector.get('$state');
                stateService.go('app.login');

                return $q.defer().resolve(rejection);
            }

            return $q.reject(rejection);
        }

    }
})();
