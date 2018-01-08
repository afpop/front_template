(function () {
    'use strict';

    angular.module('tabela-botao-menu.directive', [])
        .directive('tabelaBotaoMenu', tabelaBotaoMenu);

    tabelaBotaoMenu.$injector = ['lodash'];

    /** @ngInject */
    function tabelaBotaoMenu(lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                entradas: '=',
                item: '=',
                classe: '=',
                listaCantoDireito: '=',
                agruparBotoes: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/tabela-botao-menu/tabela-botao-menu.template.html',
            link: function (scope, element, attrs) {

                scope.obterEntradasExibicao = obterEntradasExibicao;
                scope.obterEntradaTitulo = obterEntradaTitulo;
                scope.obterEntradaIcone = obterEntradaIcone;
                scope.dispararEntradaFuncao = dispararEntradaFuncao;
                scope.possuiEntradasParaExibir = possuiEntradasParaExibir;
                scope.possuiUnicaEntradaParaExibir = possuiUnicaEntradaParaExibir;
                scope.obterClasse = obterClasse;
                scope.obterClasseIcone = obterClasseIcone;
                scope.alternarExibicaoEntrada = alternarExibicaoEntrada;
                scope.eListaCantoDireito = eListaCantoDireito;
                scope.obterEntradasExibicaoBotao = obterEntradasExibicaoBotao;

                var _entradaAberto = false;

                function obterEntradas() {
                    return scope.entradas ? scope.entradas : [];
                };

                function obterEntradasExibicao() {
                    return lodash.filter(obterEntradas(), function (entrada) {
                        return obterEntradaExibicao(entrada) && !eBotao(entrada);
                    });
                };

                function obterEntradasExibicaoBotao(){
                    return lodash.filter(obterEntradas(), function (entrada) {
                        return obterEntradaExibicao(entrada) && eBotao(entrada);
                    });
                };

                function possuiEntradasParaExibir() {
                    return obterEntradasExibicao().length > 0;
                };

                function possuiUnicaEntradaParaExibir() {
                    return obterEntradasExibicao().length == 1;
                };

                function obterClasse() {
                    return scope.classe ? scope.classe : 'btn-xs';
                };

                function obterClasseIcone() {
                    return scope.classeIcone ? scope.classeIcone : 'fa-bars';
                }

                function eListaCantoDireito() {
                    return scope.listaCantoDireito ? scope.listaCantoDireito : '';
                }

                function obterItem() {
                    return scope.item ? scope.item : undefined;
                };

                function obterEntradaExibicao(entrada) {
                    return angular.isFunction(entrada.exibir) ? entrada.exibir(obterItem()) : angular.isUndefined(entrada.exibir) ? true : entrada.exibir;
                };

                function obterEntradaTitulo(entrada) {
                    return angular.isFunction(entrada.titulo) ? entrada.titulo(obterItem()) : entrada.titulo;
                };

                function obterEntradaIcone(entrada) {
                    return angular.isFunction(entrada.icone) ? entrada.icone(obterItem()) : entrada.icone;
                };

                function eBotao(entrada) {
                    return entrada.botao;
                };

                function dispararEntradaFuncao(entrada) {
                    entrada.funcao(obterItem());
                };

                function alternarExibicaoEntrada() {
                    scope._entradaAberto = !_entradaAberto;
                };

            }
        }

    }


})();
