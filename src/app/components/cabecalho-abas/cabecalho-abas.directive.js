(function () {
    'use strict';

    angular.module('cabecalho-abas.directive', [])
        .directive('cabecalhoAbas', cabecalhoAbas);

    cabecalhoAbas.$injector = ['cabecalhoAbasService'];

    /** @ngInject */
    function cabecalhoAbas(cabecalhoAbasService) {

        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controllerAs: 'controller',
            templateUrl: 'app/components/cabecalho-abas/cabecalho-abas.template.html',
            link: function (scope, element, attrs) {


                scope.obterListaAbas = cabecalhoAbasService.obterAbas;
                scope.isAbaDesativada = _isAbaDesativada;
                scope.obterDescricaoAba = _obterDescricaoAba;
                scope.obterIconeAba = _obterIconeAba;
                scope.cliqueAba = _cliqueAba;
                scope.isAbaSelecionada = _isAbaSelecionada;

                function _isAbaDesativada(item) {
                    return angular.isFunction(item.desativado) ? item.desativado() : item.desativado;
                }

                function _isAbaSelecionada(item){
                    return item.id == cabecalhoAbasService.obtemAbaSelecionada().id;
                }

                function _obterDescricaoAba(item) {
                    return angular.isFunction(item.descricao) ? item.descricao() : item.descricao;
                }

                function _obterIconeAba(item) {
                    return angular.isFunction(item.icone) ? item.icone() : item.icone;
                }

                function _cliqueAba(item) {
                    !_isAbaDesativada(item) ? _cliqueAbaAcao(item) : angular.noop();
                }

                function _cliqueAbaAcao(item) {
                    cabecalhoAbasService.selecionarAba(item);
                }

            }
        }
    }

})();
