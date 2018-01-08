(function () {
    'use strict';

    angular.module('tabela-paginacao.directive', [])
        .directive('tabelaPaginacao', tabelaPaginacao);

    /** @ngInject */
    function tabelaPaginacao(lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                lista: '=',
                aoProcessarLista: '=',
                maximoItensPorPagina: '=',
                exibirItensPorPagina: '=',
                paginacaoLista: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/tabela-paginacao/tabela-paginacao.template.html',
            link: function (scope, element, attrs) {

                scope.aoAlterarPaginaAtual = aoAlterarPaginaAtual;
                scope.aoAlterarItensPorPagina = aoAlterarItensPorPagina;
                scope.avancarPaginacao = avancarPaginacao;
                scope.retrocederPaginacao = retrocederPaginacao;
                scope.aumentarItensPorPagina = aumentarItensPorPagina;
                scope.diminuirItensPorPagina = diminuirItensPorPagina;
                scope.definirItensPorPagina = definirItensPorPagina;
                scope.definirPaginaAtual = definirPaginaAtual;
                scope.obterTotalItens = obterTotalItens;
                scope.obterItensPorPagina = obterItensPorPagina;
                scope.ePaginacaoLista = ePaginacaoLista;
                scope.eExibirItensPorPagina = eExibirItensPorPagina;

                scope.obterGridSpan = obterGridSpan;
                scope.obterLista = obterLista;

                scope.obterNumeroTotalPaginas = obterNumeroTotalPaginas;

                scope.$watchCollection(function () {
                    return obterLista();
                }, function () {
                    paginar();
                });

                iniciar();

                function obterLista() {
                    return scope.lista ? scope.lista : [];
                };

                function obterNumeroTotalPaginas() {
                    var _retorno = Math.ceil(obterLista().length / obterItensPorPagina());
                    return _retorno > 0 ? _retorno : 1;
                };

                function obterTotalItens() {
                    return obterLista().length;
                };

                function obterItensPorPagina() {
                    var propriedade = 'itensPorPagina';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function obterMaximoItensPorPagina() {
                    var propriedade = 'maximoItensPorPagina';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function obterPaginaAtual() {
                    var propriedade = 'paginaAtual';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function paginar() {
                    scope.aoProcessarLista(obterPaginaLista(obterLista(), obterItensPorPagina(), obterPaginaAtual()));
                };

                function obterPaginaLista(lista, itensPorPagina, pagina) {
                    var begin = (pagina - 1) * itensPorPagina;
                    var end = begin + itensPorPagina;

                    return lista.slice(begin, end);
                };

                function aoAlterarPaginaAtual(pagina) {
                    if (parseInt(pagina) > obterNumeroTotalPaginas()) {
                        pagina = obterNumeroTotalPaginas();
                    }
                    definirPaginaAtual(pagina);
                };

                function aoAlterarItensPorPagina(numeroItens) {
                    if (parseInt(numeroItens) > obterMaximoItensPorPagina() || !numeroItens) {
                        numeroItens = 10;
                    }
                    definirItensPorPagina(numeroItens);
                };

                function avancarPaginacao() {
                    definirPaginaAtual(obterPaginaAtual() + 1);
                };

                function retrocederPaginacao() {
                    definirPaginaAtual(obterPaginaAtual() - 1);
                };

                function aumentarItensPorPagina() {
                    definirItensPorPagina(obterItensPorPagina() + 10);
                };

                function diminuirItensPorPagina() {
                    definirItensPorPagina(obterItensPorPagina() - 10);
                };

                function definirPaginaAtual(valor) {
                    if (parseInt(valor) > obterNumeroTotalPaginas()) {
                        scope.paginaAtual = 1;
                    }
                    else if (parseInt(valor) < 1) {
                        scope.paginaAtual = obterNumeroTotalPaginas();
                    }
                    else if (parseInt(valor)) {
                        scope.paginaAtual = parseInt(valor);
                    }

                    paginar();
                };

                function definirItensPorPagina(valor) {
                    if (valor < 5) {
                        scope.itensPorPagina = 5;
                    }
                    else if (valor > obterMaximoItensPorPagina()) {
                        scope.itensPorPagina = obterMaximoItensPorPagina();
                    }
                    else if (parseInt(valor)) {
                        scope.itensPorPagina = parseInt(valor);
                    }
                    paginar();
                };

                function obterGridSpan() {
                    var propriedade = 'spanControladores';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function ePaginacaoLista() {
                    var propriedade = 'paginacaoLista';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function eExibirItensPorPagina() {
                    var propriedade = 'exibirItensPorPagina';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function obterDefaults(valor) {
                    var _defaults = {
                        spanControladores: 6,
                        maximoItensPorPagina: 100,
                        paginaAtual: 1,
                        itensPorPagina: 5,
                        paginacaoLista: false,
                        exibirItensPorPagina: true
                    };
                    if (!valor) {
                        return _defaults;
                    }
                    return _defaults[valor];
                };

                function iniciar() {
                    scope.paginaAtual = obterDefaults('paginaAtual');
                    scope.itensPorPagina = obterDefaults('itensPorPagina');
                }
            }
        }

    }


})();
