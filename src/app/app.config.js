(function () {
    'use strict';

    angular
        .module('config',
            [
                'constants-config',
                'route-config',
                'run-config'
            ])
        .config(config)
        .config(interceptor);

    config.$injector = ['$provide'];

    /** @ngInject */
    function config($provide) {

        $provide.decorator('$state', function ($delegate, $stateParams, $rootScope) {

            $delegate.forceReload = function (callback) {

                if (angular.isFunction(callback)) callback();
                return $delegate.go($delegate.current, $stateParams, {
                    reload: true
                });

            };

            var changeStart = $rootScope.$on('$stateChangeStart', function (event, state, params) {

                $delegate.next = state;
                $delegate.toParams = params;

            });

            return $delegate;

        });
    }

    interceptor.$injector = ['$httpProvider'];

    /*** @ngInject */
    function interceptor($httpProvider) {

        $httpProvider.interceptors.push('interceptorProviderService');

    }

})();
