(function () {
    'use strict';

    angular.module('apontamento.route-service', [])
        .service('apontamentoRouteService', apontamentoRouteService);

    apontamentoRouteService.$injector = ['$http', '$log', 'API'];

    /** @ngInject */
    function apontamentoRouteService($http, $log, API) {

        var apontamentoRouteService = {};

        apontamentoRouteService.modulo = "apontamento";
        apontamentoRouteService.obterRelatorio = apontamentoRouteService.modulo + "/obterRelatorio";

        return apontamentoRouteService;
    }
})();
