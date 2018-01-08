(function () {
    'use strict';

    angular.module('data-service', [])
        .service('dataService', dataService);

    dataService.$injector = ['$http', '$log', 'API'];

    /** @ngInject */
    function dataService($http, $log, API) {

        var dataService = {};

        dataService.post = _post;
        dataService.get = _get;

        return dataService;

        //gets
        function _get(route, model) {

            return $http.get(API.URL + route + (model ? ("/" + model) : ""))
                .then(sucesso)
                .catch(erro);

            function sucesso(response) {
                return response.data;
            }

            function erro(error) {

                var mensagem = 'XHR Failed for ' + route + '.';

                if (error.data && (error.data.message || error.data.description))
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }

        //posts
        function _post(route, model) {

            return $http.post(API.URL + route, model)
                .then(sucesso)
                .catch(erro);

            function sucesso(response) {
                return response.data;
            }

            function erro(error) {

                var mensagem = 'XHR Failed for ' + route + '.';

                if (error.data && (error.data.message || error.data.description))
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }
    }
})();
