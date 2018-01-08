(function () {
    'use strict';

    angular.module('login.data-service', [])
        .service('loginDataService', loginDataService);

    loginDataService.$injector = [ '$http', 'API', '$q' ];

    /** @ngInject */
    function loginDataService( $http, API, $q ) {

        var _loginFactory = {};

        _loginFactory.autenticar = _autenticar;

        return _loginFactory;

        function _autenticar(model) {

            var data = "grant_type=password&username=" + model.login + "&password=" + encodeURIComponent(model.senha);

            var deferred = $q.defer();

            $http.post(API.URL + 'token', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(sucesso)
                .error(erro);

            function sucesso(response) {

                deferred.resolve(response);
            }

            function erro(err) {

                deferred.reject(err);
            }


            return deferred.promise;
        }
    }
})();
